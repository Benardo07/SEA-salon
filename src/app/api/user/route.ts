import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import {hash } from 'bcrypt';

const userSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    fullName: z.string().min(3, { message: 'Username must be at least 3 characters long' }),
    phone: z.string().min(8, { message: 'Phone number must be at least 8 characters long' }).max(15, { message: 'Phone number must be no longer than 15 characters' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }) // corrected the minimum length message
  });
  
export async function POST(req : Request) {
    try{
        const body = await req.json();

        const parsedBody = userSchema.safeParse(body);

        if(!parsedBody.success){
            return NextResponse.json(
                {
                  user: null,
                  message: 'Invalid input value',
                  errors: parsedBody.error.errors,
                },
                { status: 400 }
              );
        }
        const {email, fullName, phone, password } = parsedBody.data;

        const existingUserByEmail = await db.user.findUnique({
            where: { email },
          });
      
          if (existingUserByEmail) {
            console.log('User already exists with this email');
            return NextResponse.json(
              {
                user: null,
                message: 'User already exists with this email',
              },
              { status: 409 }
            );
          }
        
          const hashedPassword = await hash(password, 10);
          
          const createdUser = await db.user.create({
            data: { 
                email,
                fullName: fullName,
                phone: phone,
                password : hashedPassword,
            },
          });

          return NextResponse.json(
            {
              user: {
                id: createdUser.id,
                email: createdUser.email,
                fullName: createdUser.fullName,
                phone: createdUser.phone,
              },
              message: 'User created successfully',
            },
            { status: 201 }
          );
    }catch(error){
        return NextResponse.json(
            {
              user: null,
              message: 'Internal Server Error',
            },
            { status: 500 }
          );
    }
}