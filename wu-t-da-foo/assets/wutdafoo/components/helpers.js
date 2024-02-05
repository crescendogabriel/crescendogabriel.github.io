/*
    Name:           Helpers
    Author:         Gabriel Lebue
    Description:    A component that handles all the internal functions of the wutdafoo app
    Date:           January 25, 2024 5:00AM
*/

import config from "../config.js";

const app = {
    refresh() {
        if (config.wufoo.value !== '') {
            this.wufooScrape();
            config.codeCss.setValue(config.css.value);
        }
    },
    wufooScrape() {

        let title, loader, form, jsFiles = '', styles = '', customTheme; 

        var wHtml       = document.createElement('html');
        wHtml.innerHTML = this.ajax(config.wufoo.value);

        title         = wHtml.querySelector('title').innerText.replace(' ','_').trim();
        loader        = wHtml.querySelector('#redesigned-theme-2018-loader') ? wHtml.querySelector('#redesigned-theme-2018-loader').outerHTML : '';
        form          = wHtml.querySelector(`#container`).outerHTML;

        jsFiles = this.scripts(wHtml.querySelectorAll(`script`), 2);
        styles  = this.scripts(wHtml.querySelectorAll(`style`));
        styles += this.scripts(wHtml.querySelectorAll(`link[rel='stylesheet']`), -1 , 2);

        customTheme = wHtml.querySelectorAll(`link[rel='stylesheet']`)[2] ? this.ajax(wHtml.querySelectorAll(`link[rel='stylesheet']`)[2].href) : '';

        const iframe = document.createElement('iframe');
        iframe.setAttribute("id", "frameWufoo");

        config.css.value = customTheme;
        config.wufooData = {
            file    : title,
            inline  : styles,
            html    : `${loader}${form}${jsFiles}`,
            iframe  : iframe
        }

        this.setContent();
    },
    ajax(url) {
        const request = new XMLHttpRequest();
        request.open("GET", url, false);
        try {
            request.send(null);
        } catch(e) {
            const msg = `${config.errorMsg} <br> <a href="${url}" target="_blank">${url}</a>.`;
            config.errorBox.innerHTML = msg;
            config.errorBox.style.display = 'block';
            console.error(msg);
        }

        if (request.status == 200) {
            config.errorBox.style.display = 'none';
            return request.responseText;
        }

        if (request.status == 400) {
            const msg = `${config.errorMsg} <br> <a href="${url}" target="_blank">${url}</a>.`;
            config.errorBox.innerHTML = msg;
            config.errorBox.style.display = 'block';
            console.error(msg);
        }
    },
    scripts(scripts, start, end) {
        let strScript = '';

        start   = start !== undefined ? start : -1;
        end     = end !== undefined ? end : scripts.length;

        scripts.forEach((script, key) => {
            script.setAttribute("x-wufoo",'');
            if (key == 1 && script.localName == 'link') script.href = `https://crescendoc.wufoo.com${script.attributes.href.nodeValue}`;
            if (key > start && key < end) strScript += script.outerHTML;
        });

        return strScript;
    },
    

    setContent() {
        config.wufooData.iframe.src = 'data:text/html;charset=utf-8,' + 
        encodeURIComponent(`
                            ${config.wufooData.inline}
                            <style>${config.css.value}</style>
                            <body id="public" class="noI">
                                ${config.wufooData.html}
                            </body>
                        `);
    },
}

export default {...app}