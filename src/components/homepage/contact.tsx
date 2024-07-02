export default function Contact(){
    const contacts = [
        { name: "Thomas", phone: "08123456789" },
        { name: "Sekar", phone: "08164829372" }
      ];
    
      return (
        <div className="py-20"> 
          <h2 className="text-[#0e141b] text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3 pt-5">Contact Details</h2>
          <div className="p-4 grid grid-cols-2">
            {contacts.map((contact, index) => (
              <div key={index} className={`flex flex-col gap-1 border-t border-solid border-t-[#d0dbe7] py-4 ${index % 2 === 0 ? 'pr-2' : 'pl-2'}`}>
                <p className="text-[#4e7397] text-sm font-normal leading-normal">{contact.name}</p>
                <p className="text-[#0e141b] text-sm font-normal leading-normal">{contact.phone}</p>
              </div>
            ))}
          </div>
        </div>
      );
}