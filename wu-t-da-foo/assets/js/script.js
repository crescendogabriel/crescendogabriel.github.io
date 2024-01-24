const app = {
    wufoo: document.querySelector('.wufoo-url'),
    wufooIframe: document.querySelector('#wufooForm'),
    css: document.querySelector('.css'),
    wufooData: '',
    codeCss: '',
    iframeHolder: document.querySelector('.iframesss'),
    init() {

        this.codeCss = CodeMirror.fromTextArea(this.css, {
            mode: 'css',
            theme: 'dracula',
            lineNumbers: true
        });

        this.refresh();
        this.wufoo.onchange = () => {
            this.refresh();
        }

        document.querySelector('.refresh').onclick = () => {
            this.refresh();
        };

        document.querySelector('.dl').onclick = () => {
            this.download();
        };

        document.querySelectorAll('.resp').forEach((resp) => {
            resp.onclick = (btn) => {
                this.responsiveScreen(btn.target.attributes[1].nodeValue);
            };
        });

        

        this.codeCss.on('change', (editor) => {
            const text = editor.doc.getValue()
            $('.realtime').html(text);
        });
    },
    refresh() {
        if (this.wufoo.value !== '') {
            $('[x-wufoo]').remove();
            $('head > style').remove();

            this.wufooData = this.wufooScrape();

            $(this.iframeHolder).html(this.wufooData.html);
            $('head').append(this.wufooData.inline);
            $('.script').html(this.wufooData.js);
            
            this.css.value = this.wufooData.theme == '' ? this.css.value : this.wufooData.theme;
            this.codeCss.setValue(this.css.value);
            $('.realtime').html(this.css.value);
        }
    },
    wufooScrape() {

        let title, loader, form, jsFiles = '', styles = '', customTheme; 

        var wHtml       = document.createElement('html');
        wHtml.innerHTML = this.ajax(this.wufoo.value);

        title         = wHtml.querySelector('title').innerText.replace(' ','_').trim();
        loader        = wHtml.querySelector('#redesigned-theme-2018-loader') ? wHtml.querySelector('#redesigned-theme-2018-loader').outerHTML : '';
        form          = wHtml.querySelector(`#container`).outerHTML;

        jsFiles = this.scripts(wHtml.querySelectorAll(`script`), 2);
        styles  = this.scripts(wHtml.querySelectorAll(`style`));
        styles += this.scripts(wHtml.querySelectorAll(`link[rel='stylesheet']`), -1 , 2);

        customTheme = wHtml.querySelectorAll(`link[rel='stylesheet']`)[2] ? this.ajax(wHtml.querySelectorAll(`link[rel='stylesheet']`)[2].href) : '';

        return {file: title, html: `${loader}${form}`, js: jsFiles, inline: styles, theme: customTheme};
    },
    ajax(url) {
        const request = new XMLHttpRequest();
        request.open("GET", url, false);
        request.send(null);

        if (request.status == 200) {
            $('.error-message').hide();
            return request.responseText;
        }

        if (request.status == 400) {
            const msg = `The custom theme is not hosted in wufoo, Kindly visit the link and copy the code manually in the textarea <br> <a href="${cssHref}" target="_blank">${cssHref}</a>.`;
            document.querySelector('.error-message').innerHTML = msg;
            $('.error-message').fadeIn();
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
    download() {
        if (this.wufoo.value !== '') {
        const textFileAsBlob = new Blob([this.css.value], {type:'text/plain'}),
        downloadLink         = document.createElement("a"),
        timestamp            = new Date();

        fDate = timestamp.toLocaleDateString('en-PH').replace('/','_');
        fTime = timestamp.toLocaleTimeString('en-PH').replace(' ','_').replace(':','_');

        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.download = `${this.wufooData.file}__${fDate}__${fTime}.css`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        } else {
            this.css.focus();
        }
    },
    responsiveScreen(scrn) {
        const right = document.querySelector('[main-right]');
        right.className = '';

        if (scrn === 'sm') {
            right.classList.add('col-4');
            right.classList.add('offset-2');
        } else if (scrn === 'md') {
            right.classList.add('col-6');
            right.classList.add('offset-1');
        } else {
            right.classList.add('col-8');
        }
    }
}


app.init();