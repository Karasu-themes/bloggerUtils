import { parserConfig } from "./parserConfig";
import { feedPost, feedPostsList } from "./feed";
import { template } from "./template";
import { parser } from "./parser";

export function renderPost ( blogID ) {
    const nodes = document.querySelectorAll('.bs-render-post');

    if (!nodes) return;

    [...nodes].forEach( (node, index) => {
        const body = document.body;
        const cfg = {...node.dataset};
        const cbName = `rnderPost${index+1}`;
        const _html = node.querySelector('.bs-render');
        const request = cfg.postId ? 
        feedPost( { blogId: blogID, postId: cfg.postId, cbName }) : 
        feedPostsList( { blogId: blogID, cbName, label: cfg.label ?? false, maxResults: cfg.maxResults });

        if (request) body.appendChild(request);
        
        window[cbName] = function (json) {
            node.innerHTML='';
            
            if (!cfg.postId) {
                const entries = json.feed.entry;
                if (typeof entries !== "undefined") {
                    entries.forEach(post => {
                        const entry = parser(post, {});
                        node.innerHTML+=template(_html.innerHTML.replace(/data-src/g, 'src'), entry);
                    })
                }
            }

            if (cfg.postId) {
                const entry = parser(json.entry, {});
                node.innerHTML=template(_html.innerHTML.replace(/data-src/g, 'src'), entry)
            };

            // Quitamos el script
            request.remove();
        }
        
    });

}