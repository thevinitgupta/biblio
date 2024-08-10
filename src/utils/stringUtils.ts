export const separateName = (name : string ) : {firstName : string, lastName : string} => {
    const match = name.match(/^(\S+)\s*(.*)$/);
    return match ? { firstName: match[1], lastName: match[2].trim() } : { firstName: "", lastName: "" };
  };