var detect = navigator.userAgent.toLowerCase();

function OpenHelp(sAnchor,direct)
{	
	sUrl = getUrl(sAnchor,direct);
	newWin = window.open(sUrl, "surveyHelpWindow", "width=800,height=600,toolbar=no,menubar=no,location=no,scrollbars=no,resizable=1");
	if (newWin != null)
	{
	   	newWin.focus();
	}
	else
	{
		alert("Please enable pop-up windows for this site !");
	}
	return false;
}

function getUrl(sAnchor,direct){
    if (direct)
    {
        return sAnchor;
    }
	var context = "SurveyAdmin";
	ss = "";
	sp = sAnchor.split(":")
	if (sp.length == 2)
	{
		sAnchor = sp[1];
		ss = sp[0]+"/";
		context = sp[0];
	}
    return "../OLH/"+ss+"index.html?context="+context+"&topic="+sAnchor;
}

function calendar_init(inputField,button) {
	Calendar.setup({
				inputField     :    inputField,
        ifFormat       :    "%m/%d/%Y",
				firstDay       :		1,
        showsTime      :    false,
				weekNumbers 	 :		false,
        button         :    button,
        singleClick    :    true,
        step           :    1
   });
}


function loadSource(id,url) {
	if (document.layers) {
		var lyr = document.layers[id];
		lyr.load(url,lyr.clip.width);
	} else if (document.getElementById) {
		var el=document.getElementById(id);
		el.innerHTML='<iframe id="edit_frame" width="100%" height="100%" src="' + url + '"></iframe>';
		if ( detect.indexOf('msie') ) {
			document.getElementsByTagName('html')[0].style.overflow = 'hidden';
		}
		document.getElementsByTagName('body')[0].style.overflow = 'hidden';
		document.getElementById('blocker').style.display = 'block';
		document.getElementById('close').style.display = 'block';
		el.style.display = 'block';
		
	}
	return false;
}

function reloadWindow(id, url) {
	if (document.getElementById) {
		var el=document.getElementById(id);
		el.src = url;
	}
	return true;	
}

function hideWindow(id) {
	if (document.getElementById) {
		var el=document.getElementById(id);
		if ( detect.indexOf('msie') ) {
			document.getElementsByTagName('html')[0].style.overflow = 'auto';
			document.getElementsByTagName('body')[0].style.overflow = 'auto';
		} else {
			document.getElementsByTagName('body')[0].style.overflow = 'visible';
		}

		document.getElementById('blocker').style.display = 'none';
		document.getElementById('close').style.display = 'none';
		el.style.display = 'none';
		// Fix for Chrome and Safari
		window.scrollBy(1,1);
		window.scrollBy(-1,-1);
	}
	return true;	
}

function saveURL(curURL) {
	newURL = curURL.replace(/\#.*$/g,"");
	newURL = newURL.replace(/&_suffix\=[^&]*/g,"");
	if (newURL.indexOf('?') == -1 ) {
		newURL += '?'
	}
	newURL += '&_suffix=' +  new Date().getTime();
	return newURL;
}

function removePageIndex(curURL) {
	newURL = curURL.replace(/\#.*$/g,"");
	return newURL.replace(/&page_index\=[^&]*/g,"");
	if (newURL.indexOf('?') == -1 ) {
		newURL += '?'
	}
	return newURL;
}

function moveOption(objSelect,bDir) {
	if ( document.getElementById(objSelect) ) {
		el = document.getElementById(objSelect);
		var idx = el.selectedIndex
		if (idx==-1) 
			alert("You must first select the question to reorder.")
		else {
			var nxidx = idx+( bDir? -1 : 1)
			if (nxidx<0) nxidx=0
			if (nxidx>=el.length) nxidx=el.length-1
			var oldVal = el[idx].value
			var oldText = el[idx].text
			el[idx].value = el[nxidx].value
			el[idx].text = el[nxidx].text
			el[nxidx].value = oldVal
			el[nxidx].text = oldText
			el.selectedIndex = nxidx
		}
	}
}

function submitReorder(objSelect) {
	if ( document.getElementById(objSelect) ) {
		el = document.getElementById(objSelect);
		var strIDs = ""
		for (var j=0;j<el.options.length;j++)
			strIDs += el.options[j].value + ","
		document.getElementById('rr').value = strIDs.substring(0,strIDs.length-1)
	}
	return true;
}

function optionChanged(group_index, option_index, total_options) {
	if ( document.getElementById('answer_id[' + group_index + '][' + total_options + ']') && document.getElementById('verbatim_answer[' + group_index + '][' + total_options + ']') ) {
		obj = document.getElementById('answer_id[' + group_index + '][' + total_options + ']');
		obj_text = document.getElementById('verbatim_answer[' + group_index + '][' + total_options + ']');
		if (obj.checked) {
			obj_text.disabled = 0;
		} else {
			obj_text.disabled = 1;		
		}			
	}
}

function markOption(group_index, option_index, total_options) {
	if ( document.getElementById('answer_id[' + group_index + '][' + option_index + ']') ) {
		obj = document.getElementById('answer_id[' + group_index + '][' + option_index + ']');
		if (obj.checked) {
			obj.checked = 0;
		} else {
			obj.checked = 1;		
		}
	}
	optionChanged(group_index, option_index, total_options);

	return false;
}

function clearErrors(listObj) {
	if (listObj) {
		for (i=0;i<listObj.length;i++) {
			if ( document.getElementById('error_' + listObj[i]) ) {
				document.getElementById('error_'+ listObj[i]).innerHTML = '';
			}
		}
	}
}

function changeDBProvider(provider_name) {
	switch(provider_name) {
		case 'ORACLE':
			document.getElementById('DBMachineName').disabled = 1;
			document.getElementById('DBName').disabled = 1;
			document.getElementById('OracleTNSName').disabled = 0;
			break;
		default:
			document.getElementById('DBMachineName').disabled = 0;
			document.getElementById('DBName').disabled = 0;
			document.getElementById('OracleTNSName').disabled = 1;
	}
}


function changeQuestionType(question_type) {
	switch(question_type) {
		case 'radio':
			document.getElementById('question_label').disabled = 0;
			document.getElementById('question_required').disabled = 0;
			document.getElementById('question_last_verbatim').disabled = 0;
			document.getElementById('question_answer').disabled = 0;
			break;
		case 'checkbox':
			document.getElementById('question_label').disabled = 0;
			document.getElementById('question_required').disabled = 0;
			document.getElementById('question_last_verbatim').disabled = 0;
			document.getElementById('question_answer').disabled = 0;
			break;
		case 'page-separator':
			document.getElementById('question_label').disabled = 1;
			document.getElementById('question_required').disabled = 1;
			document.getElementById('question_last_verbatim').disabled = 1;
			document.getElementById('question_answer').disabled = 1;
			break;
		default:
			document.getElementById('question_label').disabled = 0;
			document.getElementById('question_required').disabled = 0;
			document.getElementById('question_last_verbatim').disabled = 1;
			document.getElementById('question_answer').disabled = 1;
	}
}
