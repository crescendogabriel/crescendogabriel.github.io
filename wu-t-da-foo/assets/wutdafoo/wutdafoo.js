/*
    Name:           Wutdafoo App
    Author:         Gabriel Lebue
    Description:    A wufoo theme editor designed to edit the css of a custom theme of the form
    Date:           January 25, 2024 5:00AM
*/

import config from "./config.js";
import app from "./components/helpers.js";
import buttons from "./components/buttons.js";
import plugins from "./components/plugins.js";

const wutdafoo = {
    init() {

        config.wufoo.onchange = () => {
            app.refresh();
        }

        config.refreshButton.onclick = () => {
            app.refresh();
        };

        config.downloadButton.onclick = () => {
            buttons.download();
        };

        config.responsiveButtons.forEach((button) => {
            button.onclick = (btn) => {
                buttons.responsive(btn.target.attributes[1].nodeValue);
            };
        });

        plugins.codeMirror();
    },
}

export default {...wutdafoo}