function ToColonedDigits(time: string) {
  return time.replace(/[Hms]/g, '');
}

export { ToColonedDigits };
