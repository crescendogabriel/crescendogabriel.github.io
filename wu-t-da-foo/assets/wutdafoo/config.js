/*
    Name:           Config
    Author:         Gabriel Lebue
    Description:    Settings/Configuration file for the wutdafoo app
    Date:           January 25, 2024 5:00AM
*/

const config = {
    wufoo:              document.querySelector('.wufoo-url'),
    wufooIframe:        document.querySelector('#wufooForm'),
    css:                document.querySelector('.css'),
    wufooData:          '',
    codeCss:            '',
    iframeHolder:       document.querySelector('.iframe__container'),
    responsiveButtons:  document.querySelectorAll('.resp'),
    refreshButton:      document.querySelector('.refresh'),
    downloadButton:     document.querySelector('.dl'),
    rightPanel:         document.querySelector('[main-right]'),
    errorBox:           document.querySelector('.error-message'),
    errorMsg:           'The custom theme is not hosted in wufoo, Kindly visit the link and copy the code manually in the textarea',
    wufooIframe:        document.querySelector('#frameWufoo'),
}

export default {...config}