var NabbleTabs = new Object();

document.writeln('<link rel="stylesheet" href="/util/nabbletabs.css?1" type="text/css" />');

NabbleTabs.startTabControl = function(isLive) {
	NabbleTabs.isLive = isLive;
	document.writeln('<ul id="tabs" class="medium-border-color">');
};

NabbleTabs.addLiveTab = function(elemId, text, selected,onclick) {
	if (!NabbleTabs.isLive) alert('Live tab not allowed. Use static tabs only');
	if (selected) {
		NabbleTabs.selected = elemId;
		document.writeln('<li id="li-' + elemId + '" class="tab-selected"><a id="a-' + elemId + '" class="tab-link-selected medium-border-color no-bg-color">' + text + '</a></li>');
	} else
		document.writeln('<li id="li-' + elemId + '"><a id="a-' + elemId + '" class="light-bg-color medium-border-color">' + text + '</a></li>');

	if (onclick) {
		$(document).ready(function() {
			$('#li-'+elemId).click(function() { setTimeout(function() { onclick() },50); });
		});
	}
};

NabbleTabs.addTab = function(link, text, selected) {
	if (NabbleTabs.isLive) alert('Static tab not allowed. Use live tabs only');
	if (selected)
		document.writeln('<li class="tab-selected"><a class="tab-link-selected medium-border-color no-bg-color">' + text + '</a></li>');
	else
		document.writeln('<li><a href="' + link + '" class="light-bg-color medium-border-color">' + text + '</a></li>');
};

NabbleTabs.endTabControl = function() {
	document.writeln('</ul>');

	$(document).ready(function() {
		if (NabbleTabs.isLive) {
			$('#tabs li').click(function() {
				if ($(this).attr('id') != 'li-' + NabbleTabs.selected) {
					$('#li-'+NabbleTabs.selected).removeClass('tab-selected').css('cursor', 'pointer');
					$('#a-'+NabbleTabs.selected).removeClass('no-bg-color').removeClass('tab-link-selected').addClass('light-bg-color').css('cursor', 'pointer');
					$('#'+NabbleTabs.selected).hide();
					NabbleTabs.selected = $(this).attr('id').substring(3);
					$('#li-'+NabbleTabs.selected).addClass('tab-selected').css('cursor', 'default');
					$('#a-'+NabbleTabs.selected).removeClass('light-bg-color').addClass('no-bg-color').addClass('tab-link-selected').css('cursor', 'default');
					$('#'+NabbleTabs.selected).show();
					Nabble.resizeFrames();
				}
			});
		} 
		$('#tabs a').hover(
				function() {
					if (!$(this).hasClass('tab-link-selected'))
						$(this).css('border-top-width', '3px');
				},
				function() {
					if (!$(this).hasClass('tab-link-selected'))
						$(this).css('border-top-width', '1px');
				}
		);
	});
};