<!-- footer -->
<div class="footer py-4">
    <a class="links" href="<?php echo APP_URL ?>/blog" target="_blank">Blog</a>

    <div class="links" data-toggle="modal" data-target="#modalPrivacy">
        Privacy policy
    </div>

    <div class="links" data-toggle="modal" data-target="#modalTermsofuse">
        Terms of use
    </div>
    <div class="links" data-toggle="modal" data-target="#modalDisclaimer">
        Disclaimer
    </div>
</div>

<!-- Modals -->

<!-- privacy policy -->
<div class="modal fade" id="modalPrivacy">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                    Privacy Policy
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <?php require_once APP_PATH . "/content/privacy-policy.html" ?>
            </div>
        </div>
    </div>
</div>

<!-- terms of use -->
<div class="modal fade" id="modalTermsofuse">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                    Terms of use
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <?php require_once APP_PATH . "/content/terms-of-use.html" ?>
            </div>

        </div>
    </div>
</div>

<!-- Disclaimer -->
<div class="modal fade" id="modalDisclaimer">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                    Disclaimer
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <?php require_once APP_PATH . "/content/disclaimer.html" ?>
            </div>
        </div>
    </div>
</div>