import {
  directiveDefault,
  directiveIf,
  directiveElse,
  directiveLoop,
  directiveImage
} from "./directives";

export function template(str, obj) {
  let tlp = directiveDefault(str, obj);

  const directives = [directiveIf, directiveElse, directiveLoop, directiveImage];

  directives.forEach(dir => {
    tlp = dir(tlp, obj);
  });

  return tlp;
}