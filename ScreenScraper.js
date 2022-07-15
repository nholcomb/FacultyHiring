javascript:
/**
 * PUP Req Job Ad Pre-Populate
 * Version: 2016-09-22-pup_req_job_ad_populate-1.3
 * Populate the PUP Position Description Job Posting Wysiwyg text area from fields above in the form.
 * Note: This is a proof of concept;
 * Branch: master
 * Branch Notes: Due to the multi-line nature of the ad. template, this version of the code isn't compatible w/ locally hosted bookmarklet. The JS needs to be un-minified to work properly.
 *
 * Usage:
 ** Authenticate to your PUP account.
 ** Navigate to manage requisitions: https://admin.dc4.pageuppeople.com/v5.3/provider/manageJobs/manageJobs.asp
 ** Open a position
 ** Click the bookmarklet
 ** bask in the pre-populated text to appear in job advertisement
 * TODO: Cross Browser Support
 ** FF PC
 ** Chrome PC
 ** Edge ?
 ** DONE - FF Mac - OK as of v. new_pd_template8-bookmarklet6 2016-08-23
 ** DONE - Chrome Mac - OK as of v. new_pd_template9-bookmarklet1 2016-08-23
 ** DONE - Safari Mac - OK as of v. new_pd_template9-bookmarklet1 2016-08-23
 * DONE - add confirm when replacing exiting text. Done as of v. new_pd_template9-bookmarklet1 2016-08-23
 * DONE - Note: PUP does not support IE; Drop support for IE. Done.
 *
 * This code is served up remotely to ensure quality source control.
 * The local Bookmarklet src:
javascript:
void(z=document.body.appendChild(document.createElement('script')));
void(z.language='javascript');
void(z.type='text/javascript');
void(z.src='https://bitbucket.org/_vid/pup_req_job_ad_populate/raw/feature-templates_by_type/pup_req_job_ad_populate.js');
 * *** Contents ***
 * Functions
 * Object mapping, capturing values of fields on the page: 'pupPdElements'
 * Create template w/ object values inserted
 * Trigger MCE code evaluation (to format code if needed)
 ******************************************************************************
 * Script is maintained by Huy Duc Tran 2/3/2020
 ******************************************************************************
 */

function getMceFrame(wysiwygIframeId) {
    //var x = document.getElementById(wysiwygIframeId);
    //var y = (x.contentWindow || x.contentDocument);
    //if (y.document)y = y.document;
    //return y.getElementById('tinymce');
    return null;
}
function replaceText(text, wysiwygIframeId) {
    var sel;
    sel = getMceFrame(wysiwygIframeId);
    if (sel) {
        if ((sel.innerHTML.length > 30 && confirm('Are you sure you want to replace the current text to appear in job advertisement?')) || sel.innerHTML.length <= 30) {
            sel.innerHTML = text;
        }
    }
}
function getTextField(elementID) {
    return document.getElementById(elementID).value;
}

function getTextAreaToField(elementID) {
    return document.getElementById(elementID).value.trim().replace(/(?:\r\n|\r|\n)/g, '<br />');
}

function getBooleanField(elementID) {
    if (document.getElementById(elementID).checked) {
        return "Yes";
    } else {
        return "No";
    }
}

/* ex: getTextField("lRoleID_fieldTitle"); */
function getSelectField(elementID) {
    return document.getElementById(elementID).options[document.getElementById(elementID).selectedIndex].text;
}
/* ex getSelectField("lDepartmentID"); */
function getDropSearchField(elementID) {
    result = null;
    if (typeof document.querySelectorAll('#' + elementID + ' .result-selected')[0] !== "undefined") {
        result = document.querySelectorAll('#' + elementID + ' .result-selected')[0].innerHTML;
    }
    else
        if (typeof document.querySelectorAll('#' + elementID + ' .chosen-single span')[0] !== "undefined") {
            result = document.querySelectorAll('#' + elementID + ' .chosen-single span')[0].innerHTML;
        }
    return result;
}
/* ex getDropSearchField("GenericListType_appointment_chosen"); */

function getEssentialJobDuties() {
    /* for each document.querySelectorAll('#JobDutyWrapper div.jobDuty')
    if(div.jobDuty .dutyLevel == "Essential")
    div.jobDuty .dutyPercent
    div.jobDuty .dutyDuties
    */
    dutyOutput = [];
    dutyList = document.querySelectorAll('#JobDutyWrapper div.jobDuty');
    for (i = 0; i < dutyList.length; i++) {
        console.log('Pass: ' + i);
        console.log("what: " + dutyList[i].querySelectorAll('.dutyLevel')[0].innerHTML);
        console.log(dutyList[i].querySelectorAll('.dutyLevel').length);
        if (dutyList[i].querySelectorAll('.dutyLevel')[0].innerHTML == "Essential") {
            dutyOutput.push(dutyList[i].querySelectorAll('.dutyPercent')[0].innerHTML + '%' + ' - ' + dutyList[i].querySelectorAll('.dutyDuties')[0].innerHTML);
        }
    }
    return dutyOutput.join("<br />");
}

/**
 * Object mapping, capturing values of fields on the page: 'pupPdElements'
 * Set up the data elements (tokens) to populate the wysiwyg:
 */
var pupPdElements = {
    //pupPdClassTitle:    getTextField('lRoleID_fieldTitle'),
    //pupPdDept:          getTextField('sOther15'),
    //pupPdApptTypeDur:   getDropSearchField('GenericListType_appointment_chosen') + ', ' + getDropSearchField('GenericListType_duration_chosen'),
    //pupPdFTE:           getTextField('sOther3'),
    //pupPdAdvSalary:     getTextField('sOther4'),
    //pupPdDeptDesc:      getTextAreaToField('sTAOther3'),
    //pupPdJobDesc:       getTextAreaToField('sTAOther5'),
    //pupPdEssentDuties:  '<strong>Essential Functions - Highlights</strong><b style="color:red">TODO - need Field for this (Essential Duties Narrative)</b><br /><br />' + getEssentialJobDuties(),
    //pupPdMinReq:        getTextAreaToField('sTAOther4'),
    //pupPdProfComp:      getTextAreaToField('sTAOther1'),
    //pupPdPrefQual:      getTextAreaToField('sTAOther6'),
    //pupPdSpecInstruct:  getTextAreaToField('sTAOther7'),
    //pupPdReviewBegins:  getTextField('sOther5'),
    //pupPdRank:          getSelectField('GenericListType_rank'),
    //pupPdFlsa:          getBooleanField('bOther10'),
    //pupPdAnnualBasis:   getSelectField('lContractTypeID')


    /*pupPdAppDeadline: getTextField('sOther18'),
    pupPdPosnDetails: getTextAreaToField('sTAOther4'),
    pupPdDeptDetails: getTextAreaToField('sTAOther11'),
    pupPdSchColDescr: getTextAreaToField('sTAOther12'),
    pupPdUnivCityDescr: getTextAreaToField('sTAOther15'),
    pupPdAppInstrMater: getTextAreaToField('sTAOther14'),
    pupPdAAEEOStatement: getTextAreaToField('sTAOther13')*/


    /*pupPdAppDeadline: getTextField('sOther18'),
    pupPdPosnDetails: getTextAreaToField('sTAOther4'),
    pupPdDeptDetails: getTextAreaToField('sTAOther11'),
    pupPdSchColDescr: getTextAreaToField('sTAOther12'), //copy ours 
    pupPdUnivCityDescr: getTextAreaToField('sTAOther15'),
    pupPdAppInstrMater: getTextAreaToField('sTAOther14'),
    pupPdAAEEOStatement: getTextAreaToField('sTAOther13'),*/
    //eeo
    DateAdded: getTextAreaToField(dAddedDate),
    PosnEnd: getTextAreaToField(dPositionEnd),
    DeptDetails: getTextAreaToField(lSubDepartmentID),
    AppDetails: getTextAreaToField(sApplicationDetails),
    MinQual: getTextAreaToField(sTALargeOther2),
    PrefQual:getTextAreaToField(sTALargeOther4),
    ApptType: getTextAreaToField(GenericListType_Facultyappointment),
    SchColDescr: getTextAreaToField(sTAOther5),
    UnivCityDescr: getTextAreaToField(sTAOther6),
    EEOStatement: getTextAreaToField(sTAOther13),


};
//rank -> GenericListType_rank
//FLSA Status -> bOther10 (radio)
//Annual Basis -> lContractTypeID (select)



/**
 * HEREDOC
 Using a non-standard method of HEREDOC in JS so we can have 'pretty' templates
 * Ref: http://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript#comment-49227719
 * Ref: http://jsfiddle.net/orwellophile/hna15vLw/2/
 */
var HEREDOC;
/* Determine which template to use based on 'Type of Position': */
//switch (getTextField('lWorkTypeID')) {
switch ("") {
    case "DEMO":
        HEREDOC = function EOF() { /*!<<<EOF
EOF
*/ }
        break;
    case "Classified Staff":
        HEREDOC = function EOF() { /*!<<<EOF    
EOF
*/ }
        break;
    case "Coaches":
        HEREDOC = function EOF() { /*!<<<EOF
EOF
*/ }
        break;
    case "Faculty - Career":
    case "Faculty - Pro Tempore":
    case "Faculty - Tenure Track":
    case "Faculty - Other":
        HEREDOC = function EOF() { /*!<<<EOF
EOF
*/ }
        break;
    case "Officer of Administration":
        HEREDOC = function EOF() { /*!<<<EOF
EOF
*/ }
        break;
    default:
        HEREDOC = function EOF() { /*!<<<EOF
    <p>
    <b>Application Deadline</b><br />
    <span class="Application-Deadline" id="pupPdAppDeadline">${pupPdAppDeadline}</span>
    </p><p>
    <b>Position Details</b><br />
    <span class="Position-Details" id="pupPdPosnDetails">${pupPdPosnDetails}</span>
    </p><p>
    <b>Department Details</b><br />
    <span class="Department-Details" id="pupPdDeptDetails">${pupPdDeptDetails}</span>
    </p><p>
    <b>School/College Description</b><br />
    <span class="School/College-Description" id="pupPdSchColDescr">${pupPdSchColDescr}</span>
    </p><p>
    <b>University & Fort Worth Description</b><br />
    <span class="University-&-Fort-Worth-Description" id="pupPdUnivCityDescr">${pupPdUnivCityDescr}</span>
    </p><p>
    <b>Required Application Materials & Application Instructions</b><br />
    <span class="Required-Application-Materials-&-Application-Instructions" id="pupPdAppInstrMater">${pupPdAppInstrMater}</span></p>
    <b>AA/EEO Statement</b><br />
    <span class="AA/EEO-Statement" id="pupPdAAEEOStatement">${pupPdAAEEOStatement}</span>
EOF
*/ }
        break;
}

adTemplate(HEREDOC.toString().split(HEREDOC.name)[2].trim()
    /* ES6 style variable interpolation looking only at pupPdElements object. Normally: this[inner]: */
    .replace(/\$\{([^}]+)\}/g,
        function (outer, inner, pos) {
            if (typeof pupPdElements[inner] === "function") {
                return pupPdElements[inner]();
            }
            return pupPdElements[inner];
        }));

function adTemplate(output) {
    //replaceText(output, "sOverview_ifr");
    document.getElementById('sOverview_ifr').contentWindow.document.body.innerHTML = output;
};

/*replaceText(classifiedTemplate(), "sOverview_ifr");*/

/**
 * Trigger MCE code evaluation (to format code if needed)
 * click the code button
 * locate the open modal source code div and click() the first button Ok
 */
tinyMCE.activeEditor.buttons.code.onclick();
document.querySelectorAll('[aria-label=\'Source code\'] .mce-panel button')[0].click();
