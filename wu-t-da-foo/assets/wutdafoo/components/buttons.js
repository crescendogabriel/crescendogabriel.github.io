/*
    Name:           Buttons
    Author:         Gabriel Lebue
    Description:    A component which process all button functions in wutdafoo App
    Date:           January 25, 2024 5:00AM
*/

import config from "../config.js";

const buttons = {
    download() {
        if (config.wufoo.value !== '') {
            const textFileAsBlob = new Blob([config.css.value], {type:'text/plain'}),
            downloadLink         = document.createElement("a"),
            timestamp            = new Date();
    
            const fDate = timestamp.toLocaleDateString('en-PH').replace('/','_');
            const fTime = timestamp.toLocaleTimeString('en-PH').replace(' ','_').replace(':','_');
    
            downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
            downloadLink.download = `${config.wufooData.file}__${fDate}__${fTime}.css`;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        } else {
            config.css.focus();
        }
    },
    responsive(scrn) {
        const right = config.rightPanel;
        right.className = '';

        if (scrn === 'sm') {
            right.classList.add('col-3');
            right.classList.add('offset-3');
        } else if (scrn === 'md') {
            right.classList.add('col-6');
            right.classList.add('offset-1');
        } else {
            right.classList.add('col-8');
        }
    }
}

export default {...buttons};