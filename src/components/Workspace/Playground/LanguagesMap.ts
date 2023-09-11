import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
// import { rust } from "@codemirror/lang-rust";
import { cpp } from "@codemirror/lang-cpp";
import { LanguageSupport, StreamLanguage } from "@codemirror/language";
// import { go } from "@codemirror/legacy-modes/mode/go";
// import { ruby } from "@codemirror/legacy-modes/mode/ruby";
// import { shell } from "@codemirror/legacy-modes/mode/shell";

type LanguageDefinition = () => StreamLanguage<any> | LanguageSupport;

export const mapLanguages = (value: string): LanguageDefinition | undefined => {
  const mappedLanguages: Record<string, LanguageDefinition> = {
    javascript: () => javascript(),
    python: () => python(),
    java: () => java(),
    // rust: () => rust(),
    c: () => cpp(),
    "cpp": () => cpp(),
    // go: () => StreamLanguage.define(go),
    // ruby: () => StreamLanguage.define(ruby),
    // bash: () => StreamLanguage.define(shell)
  };

  return mappedLanguages[value];
};
