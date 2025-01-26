export function validatePhoneNumber(phoneNumber: string): boolean {
  const ArgPhoneregex =
    /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/;
  return ArgPhoneregex.test(phoneNumber);
}
