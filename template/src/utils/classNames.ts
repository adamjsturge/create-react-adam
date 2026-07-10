type ClassValue = string | false | null | undefined | Record<string, boolean>;

export default function classNames(...classes: ClassValue[]): string {
  const result: string[] = [];

  for (const entry of classes) {
    if (!entry) {
      continue;
    }

    if (typeof entry === "string") {
      result.push(entry);
      continue;
    }

    for (const [name, isEnabled] of Object.entries(entry)) {
      if (isEnabled) {
        result.push(name);
      }
    }
  }

  return result.join(" ");
}
