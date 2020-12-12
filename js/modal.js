$(() => {
    $('.links-modal').click(e => {
        let modalDataTarget = e.currentTarget.getAttribute('data-target');
        let modalObject = {
            '#modalPrivacy': {
                heading: 'Privacy policy',
                filePath: 'privacy-policy.html',
            },
            '#modalTermsofuse': {
                heading: 'Terms of use',
                filePath: 'terms-of-use.html',
            },
            '#modalDisclaimer': {
                heading: 'Disclaimer',
                filePath: 'disclaimer.html',
            },
        }[modalDataTarget];

        let modal = document.getElementById('modal-empty');
        let modalBody = document.getElementById('modal-empty-body');

        document.getElementById('modal-empty-heading').innerHTML =
            modalObject.heading;

        modalBody.innerHTML = '...';

        fetch('/content/' + modalObject.filePath)
            .then(response => response.text())
            .then(data => {
                modalBody.innerHTML = data;
                $(modal).modal();
            });
    });
});
