let registerTemplate = (() => {

    let createTemplate = function (iObj) {
        try {
            return `
           <head>
                <style>
                    .backImg{
                        background-image:url('https://ssw1994.github.io/three//assets/icons/sswlogo.JPG');
                        background-size:150px 150px !important;
                        background-repeat: no-repeat;
                        background-blend-mode: lighten;
                    }
                    .img-size{
                        width: 150px;
                        height: 150px;
                        float: right;
                    }
                    tr td{
                        font-size: 12px;
                    }
                </style>
           </head>
            <table style="width:100%;">
                    <tr>
                        <td>
                            <div class="backImg img-size"></div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>hi ${iObj.username}</span></label>
                            <div style="margin-left:5%;">
                                You have successfully created SSWShop Account please click <a href="facebook.com">here </a> to activate your account
                                <div>
                                    <br/>
                                    <div><b>Account Details are as follows</b></div>
                                    <div>
                                        <table>
                                            <tr>
                                                <td><label>Username :</label></td>
                                                <td>${iObj.username}</td>
                                            </tr>
                                            <tr>
                                                <td><label>Email :</label></td>
                                                <td>${iObj.email}</td>
                                            </tr>
                                            <tr>
                                                <td><label>Mobile :</label></td>
                                                <td>${iObj.mobile}</td>
                                            </tr>
                                            <tr>
                                                <td><label>Password</label></td>
                                                <td>${iObj.password}</td>
                                            </tr>
                                        </table>
                                    </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div style="float:right;margin-right:25px;">
                                <b>Thanks & Regards</b><br/>
                                <span>SSWShop</span>
                            </div>
                        </td>
                    </tr>
            </table>
            `
        } catch (error) {
            console.error(error);
        }
    }
    Object.assign(this, {
        createTemplate
    });
    return this;
})();
module.exports = registerTemplate;