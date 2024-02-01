/*
    Name:           Plugins
    Author:         Gabriel Lebue
    Description:    This file handles the 3rd party scripts used in wutdafoo app
    Date:           January 25, 2024 5:00AM
*/

import config from "../config.js"
import app from "./helpers.js";

const plugins = {
    codeMirror() {
        config.codeCss = CodeMirror.fromTextArea(config.css, {
            mode: 'css',
            theme: 'dracula',
            lineNumbers: true
        });

        config.codeCss.on('changes', (editor) => {
            const text = editor.doc.getValue();
            config.css.value = text;
            
            app.setContent();
            config.iframeHolder.innerHTML = config.wufooData.iframe.outerHTML;
        });
    }
}

export default {...plugins}