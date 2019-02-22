'use strict';
let currentMemoryData = null;
let current_channel = null;
let currentMemoryBankNo = null;
let currentMemoryChannelNo = null;
let selectedChannels = null;
let selectedFunction = null;
let insertPoint = null;
let templateData = null;
let frequencyList = null;
let multipleDataCreateError = null;
let functionStore = new Array;
function setFileInfo(){
    $('#file-type').text(`${currentMemoryData.fileType}, ${currentMemoryData.blockType}`);
    $('#file-model').text(currentMemoryData.model);
    $('#file-version').text(currentMemoryData.modelVersion);
    $('#file-registered-at').text(currentMemoryData.registeredAt);
}
function setSelectMemoryBank(){
    if ( currentMemoryData.fileType == SD_BACKUP ){
        $('#select-bank').empty();
        for( let i = 0; i < currentMemoryData.getBanks(); i++ ){
            $('#select-bank').append(
                $('<option>', { value: i,
                                text: paddingZero(i) })
            );
        }
        $('#select-bank').val(0).selectmenu('refresh');
        $('#f-select-bank').show();
    }else{
        $('#select-bank').empty();
        $('#select-bank').append(
            $('<option>', { value: 0,
                            text: paddingZero(0) })
        );
        $('#f-select-bank').hide();
    }
}
function setList(memoryBankNo){
    $('#channel-list-popup-screen').remove();
    $('#channel-list-popup-popup').remove();
    $('#channel-list-div').empty();
    let filter = $('<input>', { id: 'channel-search', 'data-type': 'search'});
    let filterForm = $('<form>', {class: 'ui-filterable'}).append(filter);
    let table = $('<table>', {
        'data-role': 'table',
        id: 'channel-list',
        'data-mode': 'columntoggle',
        class: 'ui-responsive table-stroke',
        'data-input': '#channel-search',
        'data-filter': 'true'
    });
    let thead = $('<thead>', { id:'memory_header'});
    let tbody = $('<tbody>', { id:'memory_channels'});
    if ( currentMemoryData.fileType == SD_BACKUP ){
        thead.append($('<tr>').append(
            $('<th>', {'data-priority': 1 , text: 'No' }),
            $('<th>', {'data-priority': 2 , text: 'Frequency' }),
            $('<th>', {'data-priority': 3 , text: 'Title' }),
            $('<th>', {'data-priority': 4 , text: 'Mode' }),
            $('<th>', {'data-priority': 5 , text: 'Edit' })
        ));
        let memoryChannels = currentMemoryData.getBankChannels(memoryBankNo);
        for( let i = 0; i < memoryChannels.length; i++ ){
            let no = $('<td>', { 'class': 'ui-checkbox'}).append(
                $('<label>',{ 'for': `line_selected_${i}`} ).append(
                    $('<input>', {type:'checkbox',
                                  name: 'line_selected',
                                  id: `line_selected_${i}`,
                                  'data-enhanced': 'true'
                                 }),
                    $('<span>', {
                        text: paddingZero(i),
                        'class': 'list-no-text'
                    })));
            let frequency = $('<td>', {id: `line_frequency_${i}`});
            let title = $('<td>', {id: `line_title_${i}`});
            let mode = $('<td>', {id: `line_mode_${i}`});
            if ( memoryChannels[i].channelRegistedFlg == '1' ){
                frequency.append(memoryChannels[i].receiveFrequency);
                title.append(memoryChannels[i].memoryTag);
                mode.append(memoryChannels[i].modeDescription());
            }
            let edit = $('<td>').append(
                $('<a>',
                  { href: '#page-detail',
                    class: 'ui-btn ui-icon-edit ui-btn-icon-notext ui-corner-all channel_row',
                    id: `channel_${i}`
                  }));
            tbody.append($('<tr>', {id: `line_${i}`}).append( no, frequency, title, mode, edit));
        }
        table.addClass('memorychannel-list');
    }else{
        thead.append($('<tr>').append(
            $('<th>', {'data-priority': 1 , text: 'No' }),
            $('<th>', {'data-priority': 2 , text: 'Title' }),
            $('<th>', {'data-priority': 3 , text: 'Mode' }),
            $('<th>', {'data-priority': 4 , text: 'Edit' })
        ));
        let memoryChannels = currentMemoryData.getBankChannels(memoryBankNo);
        for( let i = 0; i < memoryChannels.length; i++ ){
            let no = $('<td>',{ 'class': 'ui-checkbox'}).append(
                $('<label>', { 'for': `line_selected_${i}`}).append(
                    $('<input>', {type:'checkbox',
                                  name: 'line_selected',
                                  id: `line_selected_${i}`,
                                  'data-enhanced': 'true'
                                 }),
                    $('<span>', { text: paddingZero(i),
                                  'class': 'list-no-text'
                                })));
            let title = $('<td>', {id: `line_title_${i}`});
            let mode = $('<td>', {id: `line_mode_${i}`});
            if ( memoryChannels[i].channelRegistedFlg == '1' ){
                title.append(memoryChannels[i].memoryTag);
                mode.append(memoryChannels[i].modeDescription());
            }
            let edit = $('<td>').append(
                $('<a>',
                  { href: '#page-detail',
                    class: 'ui-btn ui-icon-edit ui-btn-icon-notext ui-corner-all channel_row',
                    id: `channel_${i}`
                  }));
            tbody.append($('<tr>', {id: `line_${i}`}).append( no, title, mode, edit));
        }
        table.addClass('template-list')
    }
    table.append(thead, tbody);
    $('#channel-list-div').append(filterForm, table).enhanceWithin();

}
function updateLine(memoryChannelNo){
    if ( currentMemoryData.fileType == SD_BACKUP ){
        let memoryBankNo = $('#select-bank').val();
        let channel = currentMemoryData.getChannel(memoryBankNo, memoryChannelNo);
        $(`#line_frequency_${memoryChannelNo}`).text('');
        $(`#line_title_${memoryChannelNo}`).text('');
        $(`#line_mode_${memoryChannelNo}`).text('');
        if ( channel.channelRegistedFlg == '1' ){
            $(`#line_frequency_${memoryChannelNo}`).text(channel.receiveFrequency);
            $(`#line_title_${memoryChannelNo}`).text(channel.memoryTag);
            $(`#line_mode_${memoryChannelNo}`).text(channel.modeDescription());
        }
    }else{
        let memoryBankNo = $('#select-bank').val();
        let channel = currentMemoryData.getChannel(memoryBankNo, memoryChannelNo);
        $(`#line_title_${memoryChannelNo}`).text('');
        $(`#line_mode_${memoryChannelNo}`).text('');
        if ( channel.channelRegistedFlg == '1' ){
            $(`#line_title_${memoryChannelNo}`).text(channel.memoryTag);
            $(`#line_mode_${memoryChannelNo}`).text(channel.modeDescription());
        }
    }
}
function setEditMode(fileType){
    setFileInfo();
    setSelectMemoryBank();
    setList(0);
    if( fileType == SD_BACKUP ){
        $('#fn-multiple-data-create-btn').show();
    }else{
        $('#fn-multiple-data-create-btn').hide();
    }
}
function readDataToObject( dataArray ){
    let fileType = null;
    let model = null;
    let blockType = null;
    let version = null;
    let registeredAt = null;
    let selectedMemoryBankNo = null;
    let selectedMemoryChannelNo = null;
    let banks = new Array;
    let channelData = new Array;
    for (let i = 0;i < dataArray.length; i++) {
        switch(dataArray[i][0].substr(0,2)) {
        case 'SD':
        case 'TE':
            fileType = dataArray[i][0];
            blockType = dataArray[i][1];
            model = dataArray[i][2];
            version = dataArray[i][3];
            registeredAt = dataArray[i][4];
            break;
        case 'MC':
            switch(dataArray[i][0]) {
            case 'MC1':
                channelData = dataArray[i];
                break;
            case 'MC2':
                channelData= channelData.concat(dataArray[i]);
                break;
            case 'MC3':
                channelData = channelData.concat(dataArray[i]);
                let bankNo = Number(channelData[1]);
                let channelNo = Number(channelData[2]);
                if ( banks[bankNo] == undefined ){
                    banks[bankNo] = new Array;
                }
                if ( banks[bankNo][channelNo]){
                    // error;
                }
                banks[bankNo][channelNo] = new Channel(channelData);
                break;
            case 'MC0':
                selectedMemoryBankNo = dataArray[i][1];
                selectedMemoryChannelNo = dataArray[i][2];
                break;
            case 'MC9':
                break;
            default:
            }
        }
    }
    return new MemoryData(fileType, model, blockType, version, registeredAt, selectedMemoryBankNo, selectedMemoryChannelNo, banks);
}
function showErrorPopup(message){
    $('#fn-error-message').text(message);
    $('#fn-error').popup('open');
}
function showCompletePopup(message){
    $('#fn-complete-message').text(message);
    $('#fn-complete').popup('open');
}
function readFile(fileElement){
    return new Promise(
        function( resolv, reject ){
            fileElement.parse({
                config: {
                    delimiter: '',
                    header: false,
                    dynamicTyping: false,
                    skipEmptyLines: true,
                    preview: 0,
                    step: undefined,
                    encoding: 'Shift-JIS',
                    worker: false,
                    comments: false,
                    complete: function(results){
                        if (results && results.errors){
                            if (results.errors){
//                                errorCount = results.errors.length;
//                                firstError = results.errors[0];
                            }
                            if (results.data && results.data.length > 0){
//                                rowCount = results.data.length;
                            }
                            resolv(results.data);
                        }
                    },
                    error: function(error, file){
                    },
                    download: false
                },
                before: function(file, inputElem){
                },
                error: function(){
                },
                complete: function(res){
                }
            });
        });
};

function jsonToCsv(model, filename){
    let csv = Papa.unparse( currentMemoryData.toCSVData(model));
    let javascriptCharCodeArray = csv.split('').map(
        function(value, index, array){
            return value.charCodeAt(0);
        });
    let convertSJISCodeArray = Encoding.convert(javascriptCharCodeArray, 'SIJIS', 'UNICODE');
    let blob = new Blob([new Uint8Array(convertSJISCodeArray)], {'type': 'text/csv'});
    let blobURL = window.URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.download = filename;
    a.href = blobURL;
    a.dataset.downloadurl = ['text/csv', a.download, a.href].join(':');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
function newMemoryData(model, fileType){
    let registeredDate = new Date;
    let registeredDateStr = `${registeredDate.getFullYear()}/${paddingZero(registeredDate.getMonth() + 1)}/${paddingZero(registeredDate.getDate())} ${paddingZero(registeredDate.getHours())}:${paddingZero(registeredDate.getMinutes())}:${paddingZero(registeredDate.getSeconds())}`;
    let version = '';
    let banks = new Array();
    let bankNum = ( fileType == SD_BACKUP ? MEMORY_BANK_NUM : 1 );
    for( let bank_i = 0; bank_i < bankNum; bank_i ++){
        let bank = new Array();
        for( let channel_i = 0; channel_i < MEMORY_CHANNEL_NUM; channel_i++){
            bank[channel_i] = new Channel();
        }
        banks[bank_i] = bank;
    }
    if( model == MODEL.AR_DV10.id ){
        version = '1803E';
    }else if( model == MODEL.AR_DV1.id ){
        version = '1610B';
    }else{
        vestion = '1610B';
    }
    return new MemoryData(fileType, model, 'MEM CH', version, registeredDateStr, '00', '00', banks);
}
function getSelectedChannel(){
    let selected = new Array;
    $('input[name="line_selected"]:checked').map(
        function(){
            selected.push($(this).attr('id'));
        });
    return selected;
}
function selectFrequencyFrom(selectValue){
    if( selectValue == 'frequency-list-file' ){
        $('#p-from-input').hide();
        $('#p-from-frequency-list-file').show();
    }else{
        $('#p-from-input').show();
        $('#p-from-frequency-list-file').hide();
    }
}
function multipleDataCreateCheck(){
    let errorFlg = false;
    $('#p-template-file-error').text('');
    $('#p-frequency-list-file-error').text('');
    $('#p-start-frequency-error').text('');
    $('#p-step-frequency-error').text('');
    $('#p-number-of-additional-channels-error').text('');
    if( !$('#p-template-file')[0].files[0] ){
        errorFlg = true;
        $('#p-template-file-error').text('Please select template file.');
    }
    switch( $('#p-multiple-data-create-frequency-from').val()){
    case 'frequency-list-file':
        if( !$('#p-frequency-list-file')[0].files[0] ){
            errorFlg = true;
            $('#p-frequency-list-file-error').text('Please select frequency list file.');
        }
        break;
    case 'frequency-input':
        if(!$('#p-start-frequency').val() || isNaN($('#p-start-frequency').val()) ){
            errorFlg = true;
            $('#p-start-frequency-error').text('Please input Start frequency.');
        }
        if(!$('#p-step-frequency').val() || isNaN($('#p-step-frequency').val()) ){
            errorFlg = true;
            $('#p-step-frequency-error').text('Please input Step frequency.');
        }
        if(!$('#p-number-of-additional-channels').val() || isNaN($('#p-number-of-additional-channels').val()) ){
            errorFlg = true;
            $('#p-number-of-additional-channels-error').text('Please input Number of additional channels.');
        }
        break;
    default:
        errorFlg = true;
    }
    return errorFlg;
}
function getDotPosition(value){
    let dotPosition = 0;
    if(value.lastIndexOf('.') != -1){
        dotPosition = (value.length - 1) - value.lastIndexOf('.');
    }
    return dotPosition;
}
function calcFrequency(startValue, additionalValue){
    let floatStartValue = parseFloat(startValue);
    let floatAdditionalValue = parseFloat(additionalValue);

    let startValueDotPosition = getDotPosition(startValue);
    let additionalValueDotPosition = getDotPosition(additionalValue);

    let max = Math.max(startValueDotPosition, additionalValueDotPosition);

    let intStartValue = parseInt((floatStartValue.toFixed(max) + '').replace('.', ''));
    let intAdditionalValue = parseInt((floatAdditionalValue.toFixed(max) + '').replace('.', ''));

    let power = Math.pow(10, max);

    return ( intStartValue + intAdditionalValue ) / power;
}
function multipleDataCreate(){
    if( $('#p-multiple-data-create-frequency-from').val() == 'frequency-input' ){
        frequencyList = new Array;
        let stepDotPosition = getDotPosition($('#p-step-frequency').val());
        let intStepValue = parseInt((parseFloat($('#p-step-frequency').val()).toFixed(stepDotPosition) + '').replace('.', ''));
        let power = Math.pow(10, stepDotPosition);
        for(let i = 0;i <  Number($('#p-number-of-additional-channels').val());i++){
            let additionalValue = intStepValue * i / power;
            let frequency = calcFrequency($('#p-start-frequency').val(),
                                          String(additionalValue));
            let line = new Array();
            line.push(String(frequency));
            frequencyList.push(line);
        }
    }
    let bankNo = $('#select-bank').val();
    let work = currentMemoryData.getBankChannels(bankNo).slice(0);
    for(let i = 0;i < frequencyList.length; i++){
        if( insertPoint + i == MEMORY_CHANNEL_NUM ){
            return -3;
        }
        if( work[insertPoint + i].channelRegistedFlg != '0' ){
            return -1;
        }
        if( !frequencyList[i][0] || isNaN(frequencyList[i][0]) ){
            return -2;
        }
        let channel = new Channel(templateData.getChannel(0, 0).data.slice(0));
        channel.receiveFrequency = frequencyList[i][0];
        if( frequencyList[i][1] ){
            channel.memoryTag = frequencyList[i][1].replace(MEMORY_TAG_REG,'').substr(0, 12);
        }
        work[insertPoint + i] = channel;
    }
    currentMemoryData._banks[bankNo] = work;
    return 0;
}
function defaultSaveFileName(){
    let date = new Date();
    let prefix = '';
    if( currentMemoryData.fileType == TEMPLATE_FILE ){
        prefix  = TEMPLATE_FILE_PREFIX;
    }else{
        prefix = MEMORY_CHANNEL_FILE_PREFIX;
    }
    return `${prefix}${String(date.getFullYear()).substr(2,2)}${paddingZero( date.getMonth() + 1 )}${paddingZero( date.getDate() )}.csv`;
}
function isValidSaveFilename(){
    let filename = $('#p-save-filename').val().replace(/\.csv/,'');
    if( $('#p-save-filename').val().length == 0 ){
        $('#p-save-filename').val(defaultSaveFileName());
    }
    if( filename.length > 8 ){
        $('#p-save-filename-error').text('File name is too long.')
        return false;
    }else{
        return true;
    }
}
function showWarningPopup(message, okFunction){
    $('#fn-warning-message').html(message);
    $('#fn-warning-ok').on('click', okFunction);
    $('#fn-warning').popup('open');
}
function hideWarningPopup(){
    $('#fn-warning-message').html('');
    $('#fn-warning-ok').off('click');
    $('#fn-warning').popup('close');
}
function showSaveFilePopup(){
    $('#p-save-file').popup('open');
}
function validateMemoryDataNumWithWarningPopup(afterValidFunction){
    let validateResult =  currentMemoryData.validateMemoryDataNum();
    if( validateResult.code === -1 ){
        let message = 'The number of banks or the number of channels exceeds the number of possible registrations.<br />Banks and channels that exceed the number of possible registrations will be deleted.';
        let okFunction = function(){
            functionStore.push(afterValidFunction);
            hideWarningPopup();
        };
        showWarningPopup(message, okFunction);
    }else{
        afterValidFunction();
    }
}
/** main **/
$(function() {
    $(document).on('pagecreate',
                   function(e, d){
                       $('.version').text(`Version ${VERSION}`);
                   });
    $(document).on('change', 'select#select-bank',
                   function(){
                       setList($(this).val());
                   });
    $(document).on('click', '#open-file-btn',
                   function(){
                       $('#file-select').click();
                   });
    $(document).on('change', '#file-select',
                   function(){
                       readFile($(this)).then(
                           function(readData){
                               $('#file-name').text($('#file-select').prop('files')[0].name);
                               $('#file-model').text('');
                               $('#file-version').text('');
                               $('#file-registered-at').text('');
                               currentMemoryData = readDataToObject(readData);
                               setEditMode(currentMemoryData.fileType);
                           },
                           function(error){
                               showErrorPopup('An error occurred while reading the file.');
                               return false;
                           });
                   });
    $(document).on('click', '#save-file-btn',
                   function(){
                       $('#p-save-filename-error').text('');
                       $('#p-save-filename').val(defaultSaveFileName());
                       $('#model').val(currentMemoryData.model).selectmenu('refresh');
                       validateMemoryDataNumWithWarningPopup(showSaveFilePopup);
                   });
    $(document).on('click', '.channel_row',
                   function(){
                       currentMemoryBankNo = $('#select-bank').val();
                       currentMemoryChannelNo = Number($(this).attr('id').split('_')[1]);
                       current_channel = currentMemoryData.getChannel(currentMemoryBankNo, currentMemoryChannelNo);
                   });
    $(document).on('pagebeforeshow', '#page-detail',
                   function(){
                       if ( current_channel ){
                           setDetail();
                       }else{
                           $.mobile.changePage('#page-list');
                       }
                   });
    $(document).on('click', '#fn-clear-btn',
                   function(){
                       let selected = getSelectedChannel();
                       if ( selected.length == 0 ){
                           showErrorPopup('Please select channels to clear.');
                       }else{
                           let bankNo = $('#select-bank').val();
                           for(let i = 0; i < selected.length; i++){
                               let channelNo = Number(selected[i].split('_')[2]);
                               currentMemoryData.clearChannel(bankNo, channelNo);
                               updateLine(channelNo);
                               $(`#${selected[i]}`).prop('checked', false);
                           }
                       }
                   });
    $(document).on('click', '#fn-remove-btn',
                   function(){
                       let selected = getSelectedChannel();
                       if ( selected.length == 0 ){
                           showErrorPopup('Please select channels to remove.');
                       }else{
                           let removeChannels = new Array;
                           let bankNo = $('#select-bank').val();
                           for(let i = 0; i < selected.length; i++){
                               removeChannels.push(Number(selected[i].split('_')[2]));
                           }
                           currentMemoryData.removeChannel(bankNo, removeChannels);
                           for(let i = 0; i < MEMORY_CHANNEL_NUM; i++){
                               updateLine(i);
                               $(`#line_selected_${i}`).prop('checked', false);
                           }
                       }
                   });
    $(document).on('click', '#fn-cut-btn',
                   function(){
                       let selected = getSelectedChannel();
                       if ( selected.length == 0 ){
                           showErrorPopup('Please select channels to cut.');
                       }else{
                           selectedChannels = new Array();
                           selectedFunction = 'CUT';
                           let multipleSelected = false;
                           // sort!!
                           for(let i = 0; i < selected.length; i++){
                               if( i != 0 && Number(selected[i].split('_')[2]) != selectedChannels[i - 1][1] + 1 ){
                                   multipleSelected = true;
                                   break;
                               }
                               selectedChannels.push([Number($('#select-bank').val()), Number(selected[i].split('_')[2])]);
                           }
                           if ( multipleSelected ){
                               selectedChannels = null;
                               selectedFunction = null;
                               showErrorPopup('This function can not be executed for multiple selection ranges.Please select one range and try again.');
                           }else{
                               $('#fn-info-message').text('Channels has been selected.');
                               $('#fn-info').popup('open');
                               for(let i = 0; i < selected.length; i++){
                                   $(`#line_selected_${selectedChannels[i][1]}`).prop('checked', false);
                               }

                           }
                       }
                   });
    $(document).on('click', '#fn-copy-btn',
                   function(){
                       let selected = getSelectedChannel();
                       if ( selected.length == 0 ){
                           showErrorPopup('Please select channels to copy.');
                       }else{
                           selectedChannels = new Array();
                           selectedFunction = 'COPY';
                           let multipleSelected = false;
                           // sort!!
                           for(let i = 0; i < selected.length; i++){
                               if( i != 0 && Number(selected[i].split('_')[2]) != selectedChannels[i - 1][1] + 1 ){
                                   multipleSelected = true;
                                   break;
                               }
                               selectedChannels.push([Number($('#select-bank').val()), Number(selected[i].split('_')[2])]);
                           }
                           if ( multipleSelected ){
                               selectedChannels = null;
                               selectedFunction = null;
                               showErrorPopup('This function can not be executed for multiple selection ranges.Please select one range and try again.');
                           }else{
                               $('#fn-info-message').text('Channels has been selected.');
                               $('#fn-info').popup('open');
                               for(let i = 0; i < selected.length; i++){
                                   $(`#line_selected_${selectedChannels[i][1]}`).prop('checked', false);
                               }
                           }
                       }
                   });
    $(document).on('click', '#fn-insert-btn',
                   function(){
                       let selected = getSelectedChannel();
                       if ( selected.length == 0 ){
                           showErrorPopup('Please select channels to insert.');
                       }else{
                           let insertDestination = null;
                           for(let i = 0; i < selected.length; i++){
                               if( insertDestination == null){
                                   insertDestination = Number(selected[i].split('_')[2]);
                               }
                               if( insertDestination > Number(selected[i].split('_')[2]) ){
                                   insertDestination = Number(selected[i].split('_')[2]);
                               }
                           }
                           if( selectedFunction == 'CUT' ){
                               if ( !currentMemoryData.cutInsertChannel($('#select-bank').val(),
                                                                        selectedChannels,
                                                                        insertDestination)){
                                   showErrorPopup('The maximum number of channels that can be registered in the currently selected bank is exceeded.');
                                   selectedChannels = null;
                                   selectedFunction = null;
                                   return;
                               }
                           }else if( selectedFunction == 'COPY' ){
                               if( !currentMemoryData.copyInsertChannel($('#select-bank').val(),
                                                                        selectedChannels,
                                                                        insertDestination)){
                                   showErrorPopup('The maximum number of channels that can be registered in the currently selected bank is exceeded.');
                                   selectedChannels = null;
                                   selectedFunction = null;
                                   return;
                               }
                           }else{
                               return;
                           }
                           for(let i = 0; i < MEMORY_CHANNEL_NUM; i++){
                               updateLine(i);
                               $(`#line_selected_${i}`).prop('checked', false);
                           }
                           selectedChannels = null;
                           selectedFunction = null;
                       }
                   });
    $(document).on('click', '#fn-moveup-btn',
                   function(){
                       let selected = getSelectedChannel();
                       if ( selected.length == 0 ){
                           showErrorPopup('Please select channels to move up.');
                       }else{
                           for(let i = 0; i < selected.length; i++){
                               currentMemoryData.moveUpChannel($('#select-bank').val(), Number(selected[i].split('_')[2]));
                           }
                           for(let i = 0; i < MEMORY_CHANNEL_NUM; i++){
                               updateLine(i);
                               $(`#line_selected_${i}`).prop('checked', false);
                           }
                           for(let i = 0; i < selected.length; i++){
                               if ( Number(selected[i].split('_')[2]) > -1 ){
                                   $(`#line_selected_${Number(selected[i].split('_')[2]) - 1}`).prop('checked', true);
                               }
                           }

                       }
                   });
    $(document).on('click', '#fn-movedown-btn',
                   function(){
                       let selected = getSelectedChannel();
                       if ( selected.length == 0 ){
                           showErrorPopup('Please select channels to move down.');
                       }else{
                           for(let i = selected.length - 1; i >= 0; i--){
                               currentMemoryData.moveDownChannel($('#select-bank').val(), Number(selected[i].split('_')[2]));
                           }
                           for(let i = 0; i < MEMORY_CHANNEL_NUM; i++){
                               updateLine(i);
                               $(`#line_selected_${i}`).prop('checked', false);
                           }
                           for(let i = 0; i < selected.length; i++){
                               if ( Number(selected[i].split('_')[2]) < MEMORY_CHANNEL_NUM ){
                                   $(`#line_selected_${Number(selected[i].split('_')[2]) + 1}`).prop('checked', true);
                               }
                           }

                       }
                   });
    $(document).on('click', '#fn-sort-btn',
                   function(){
                       $('#p-sort-options').empty();
                       let sortOptions = new Array;
                       if ( currentMemoryData ){
                           if ( currentMemoryData.fileType == SD_BACKUP ){
                               sortOptions = [{ priority: 1, row: 'Frequency', id: 'frequency'}, { priority: 2, row: 'Mode', id: 'mode' }];
                           }else{
                               sortOptions = [{ priority: 1, row: 'Mode', id: 'mode'}];
                           }
                           for(let i = 0;i < sortOptions.length; i++){
                               $('#p-sort-options').append($('<tr>').append(
                                   $('<td>', { text: sortOptions[i].priority }),
                                   $('<td>', { text: sortOptions[i].row }),
                                   $('<td>').append(
                                       $('<select>', { id: `${sortOptions[i].id}-sort`} ).append(
                                           $('<option>', { text: 'ASC', value: 'ASC' }),
                                           $('<option>', { text: 'DESC', value: 'DESC' })
                                       )
                                   )
                               ));
                               $(`#${sortOptions[i].id}-sort`).selectmenu();
                           }
                           $('#p-sort').popup('open');
                       }
                   });
    $(document).on('click', '#fn-multiple-data-create-btn',
                   function(){
                       let selected = getSelectedChannel();
                       if ( selected.length == 0 ){
                           showErrorPopup('Please select channels to create point.');
                       }else{
                           insertPoint = null;
                           for(let i = 0; i < selected.length; i++){
                               if(!insertPoint || insertPoint > Number(selected[i].split('_')[2]) ){
                                   insertPoint = Number(selected[i].split('_')[2]);
                               }
                           }
                           $('#insert-point').text(`No.${paddingZero(insertPoint)}`);
                           // crear pop up error
                           multipleDataCreateError = null;
                           $('#p-multiple-data-create-frequency-from').val('frequency-list-file').selectmenu('refresh');
                           selectFrequencyFrom($('#p-multiple-data-create-frequency-from').val());
                           $('#p-number-of-additional-channels').val('').textinput('refresh');
                           $('#p-start-frequency').val('').textinput('refresh');
                           $('#p-step-frequency').val('').textinput('refresh');
                           $('#multiple_data_create').popup('open');
                       }
                   });
    /* sort */
    $(document).on('click', '#sort-cancel-btn',
                   function(){
                       $('#p-sort').popup('close');
                   });
    $(document).on('click', '#execute-sort-btn',
                   function(){
                       let sortParam = [$('#frequency-sort').val(), $('#mode-sort').val()];
                       currentMemoryData.sortChannel($('#select-bank').val(), sortParam);
                       for(let i = 0; i < MEMORY_CHANNEL_NUM; i++){
                           updateLine(i);
                       }
                       $('#p-sort').popup('close');
                   });
    /** muliple data create **/
    $(document).on('click', '#multiple_data_create_cancel',
                   function(){
                       $('#p-template-file-error').text('');
                       $('#p-frequency-list-file-error').text('');
                       $('#p-start-frequency-error').text('');
                       $('#p-step-frequency-error').text('');
                       $('#p-number-of-additional-channels-error').text('');

                       for(let i = 0; i < MEMORY_CHANNEL_NUM; i++){
                           $(`#line_selected_${i}`).prop('checked', false);
                       }
                       $('#multiple_data_create').popup('close');
                   });
    $(document).on('change', '#p-multiple-data-create-frequency-from',
                   function(){
                       selectFrequencyFrom($(this).val());
                   });
    $(document).on('change', '#p-template-file',
                   function(){
                       readFile($(this)).then(
                           function(readData){
                               templateData = readDataToObject(readData);
                           },
                           function(error){
                               showErrorPopup('An error occurred while reading the template file.');
                               return false;
                           });
                   });
    $(document).on('change', '#p-frequency-list-file',
                   function(){
                       readFile($(this)).then(
                           function(readData){
                               frequencyList = new Array;
                               for(let i = 0; i < readData.length; i++){
                                   frequencyList.push(readData[i]);
                               }
                           },
                           function(error){
                               showErrorPopup('An error occurred while reading the frequency list file.');
                               return false;
                           });
                   });
    $(document).on('click', '#p-multiple-data-create-btn',
                   function(){
                       if( !multipleDataCreateCheck() ){
                           let result = multipleDataCreate();
                           if( result == 0 ){
                               for(let i = 0; i < MEMORY_CHANNEL_NUM; i++){
                                   updateLine(i);
                                   $(`#line_selected_${i}`).prop('checked', false);
                               }
                           }else{
                               multipleDataCreateError = result;
                           }
                           for(let i = 0; i < MEMORY_CHANNEL_NUM; i++){
                               $(`#line_selected_${i}`).prop('checked', false);
                           }
                           $('#multiple_data_create').popup('close');
                       };
                   });
    $(document).on('popupafterclose', '#multiple_data_create',
                   function(){
                       switch( multipleDataCreateError ){
                       case -1:
                           showErrorPopup('There are already registered channels in the creation range.');
                           break;
                       case -2:
                           showErrorPopup('Frequency invalid.');
                           break;
                       case -3:
                           showErrorPopup('The channel you are trying to register exceeds the size of the bank.');
                           break;
                       default:
                           //
                       }
                   });
    /** save file **/
    $(document).on('click', '#export_csv',
                   function(){
                       if( isValidSaveFilename() ){
                           $('#p-save-file').popup('close');
                           let saveFilename = $('#p-save-filename').val().replace(/\.csv/,'') + '.csv';
                           let saveModel = $('#model').val();
                           jsonToCsv(saveModel, saveFilename);
                       }
                   });
    $(document).on('click', '#save_cancel',
                   function(){
                       $('#p-save-file').popup('close');
                   });
    /** new file **/
    $(document).on('click', '#create-file',
                   function(){
                       switch( $('#new-file-type').val() ){
                       case 'memory-channel-file':
                           currentMemoryData = newMemoryData($('#new-file-model').val(), SD_BACKUP);
                           setEditMode(SD_BACKUP);
                           $('#file-name').text('(New File)');
                           $('#new_file').popup('close');
                           break;
                       case 'template-file':
                           currentMemoryData = newMemoryData($('#new-file-model').val(), TEMPLATE_FILE);
                           setEditMode(TEMPLATE_FILE);
                           $('#file-name').text('(New Template File)');
                           $('#new_file').popup('close');
                           break;
                       default:
                           currentMemoryData = newMemoryData($('#new-file-model').val(), SD_BACKUP);
                           setEditMode(SD_BACKUP);
                           $('#file-name').text('(New File)');
                           $('#new_file').popup('close');
                           break;
                       }
                   });
    $(document).on('click', '#new-cancel',
                   function(){
                       $('#new_file').popup('close');
                   });
    /** error**/
    $(document).on('click', '#fn-error-close',
                   function(){
                       $('#fn-error').popup('close');
                   });
    /** complete **/
    $(document).on('click', '#fn-complete-close',
                   function(){
                       $('#fn-complete').popup('close');
                   });
    /** warning **/
    $(document).on('click', '#fn-warning-close',
                   function(){
                       functionStore.pop(); //delete
                       hideWarningPopup();
                   });
    $(document).on('popupafterclose', '#fn-warning',
                   function(){
                       let afterFunction = functionStore.pop();
                       if( afterFunction ){
                           afterFunction();
                       }
                   });
    /** info **/
    $(document).on('click', '#fn-info-close',
                   function(){
                       $('#fn-info').popup('close');
                   });
});
