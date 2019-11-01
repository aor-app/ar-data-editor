/*! detail.js | v1.1.6 2019/10 AOR, LTD. | https://github.com/aor-app/ar-data-editor */
function selectMode(selectedMode){
    function setDetailIFBW(selectedMode){
        $('#d-if-bandwidth').empty();
        switch ( selectedMode ){
        case MODE.AM.value:
            $('#d-if-bandwidth').append(
                $('<option>', { value: '0', text: '15kHz'}),
                $('<option>', { value: '1', text: '8kHz'}),
                $('<option>', { value: '2', text: '5.5kHz'}),
                $('<option>', { value: '3', text: '3.8kHz'})
            );
            break;
        case MODE.SAH.value:
        case MODE.SAL.value:
            $('#d-if-bandwidth').append(
                $('<option>', { value: '0', text: '5.5kHz'}),
                $('<option>', { value: '1', text: '3.8kHz'})
            );
            break;
        case MODE.USB.value:
        case MODE.LSB.value:
            $('#d-if-bandwidth').append(
                $('<option>', { value: '0', text: '2.6kHz'}),
                $('<option>', { value: '1', text: '1.8kHz'})
            );
            break;
        case MODE.CW.value:
            $('#d-if-bandwidth').append(
                $('<option>', { value: '0', text: '500Hz'}),
                $('<option>', { value: '1', text: '200Hz'})
            );
            break;
        default: // FM and digital
            if ( currentMemoryData.model == MODEL.AR_DV1.id){
                $('#d-if-bandwidth').append(
                    $('<option>', { value: '0', text: '200kHz'})
                );
            }
            $('#d-if-bandwidth').append(
                $('<option>', { value: '1', text: '100kHz'}),
                $('<option>', { value: '2', text: '30kHz'}),
                $('<option>', { value: '3', text: '15kHz'}),
                $('<option>', { value: '4', text: '6kHz'})
            );
            break;
        }
        // set default
        switch( selectedMode ){
        case MODE.DSTR.value:
            $('#d-if-bandwidth').val('3');
            break;
        case MODE.YAES.value:
            $('#d-if-bandwidth').val('3');
            break;
        case MODE.ALIN.value:
            $('#d-if-bandwidth').val('3');
            break;
        case MODE.D_CR.value:
            $('#d-if-bandwidth').val('4');
            break;
        case MODE.P_25.value:
            $('#d-if-bandwidth').val('3');
            break;
        case MODE.DPMR.value:
            $('#d-if-bandwidth').val('4');
            break;
        case MODE.DMR.value:
            $('#d-if-bandwidth').val('3');
            break;
        case MODE.T_DM.value:
            $('#d-if-bandwidth').val('2');
            break;
        case MODE.T_TC.value:
            $('#d-if-bandwidth').val('2');
            break;
        case MODE.AUTO.value:
            $('#d-if-bandwidth').val('3');
            break;
        case MODE.FM.value:
            $('#d-if-bandwidth').val('3');
            break;
        case MODE.AM.value:
            $('#d-if-bandwidth').val('0');
            break;
        case MODE.SAH.value:
        case MODE.SAL.value:
            $('#d-if-bandwidth').val('0');
            break;
        case MODE.USB.value:
        case MODE.LSB.value:
            $('#d-if-bandwidth').val('0');
            break;
        case MODE.CW.value:
            $('#d-if-bandwidth').val('0');
            break;
        default:
            $('#d-if-bandwidth').val(current_channel.ifBandwidth);
        }
        switch( selectedMode ){
        case MODE.DSTR.value:
        case MODE.YAES.value:
        case MODE.ALIN.value:
        case MODE.D_CR.value:
        case MODE.P_25.value:
        case MODE.DPMR.value:
        case MODE.DMR.value:
        case MODE.T_DM.value:
        case MODE.T_TC.value:
        case MODE.AUTO.value: //current_channel.digitalModeEnable == '1'
            $('#d-if-bandwidth').selectmenu('disable');
            break;
        default:
            $('#d-if-bandwidth').selectmenu('enable');
        }

        $('#d-if-bandwidth').selectmenu('refresh');
    }

    if ( selectedMode == MODE.FM.value ||
         selectedMode == MODE.AUTO.value ){
        $('#f-squelch-type').show();
        selectSquelchType($('#d-squelch-type').val());
    }else{
        setSquelchType('0');
        selectSquelchType($('#d-squelch-type').val());
        $('#f-squelch-type').hide();
    }
    if ( currentMemoryData.model == MODEL.AR_DV10.id &&
         ( selectedMode == MODE.FM.value ||
           selectedMode == MODE.AUTO.value )){
        $('#f-voice-descrambler').show();
    }else{
        $('#f-voice-descrambler').hide();
    }
    if ( selectedMode == MODE.D_CR.value ||
         selectedMode == MODE.AUTO.value ){
        $('#f-dcr-encryption-code').show();
    }else{
        $('#d-dcr-encryption-code').val('0');
        $('#e-dcr-encryption-code').text('');
        $('#e-dcr-encryption-code').removeClass('error');
        $('#f-dcr-encryption-code').hide();
    }
    if ( selectedMode == MODE.DMR.value ||
         selectedMode == MODE.AUTO.value ){
        $('#f-dmr-slot-selection').show();
        $('#f-dmr-mute-by-color-code').show();
        $('#f-dmr-color-code').show();
    }else{
        $('#f-dmr-slot-selection').hide();
        $('#f-dmr-mute-by-color-code').hide();
        $('#f-dmr-color-code').hide();
    }
    if ( selectedMode == MODE.P_25.value ||
         selectedMode == MODE.AUTO.value ){
        $('#f-apco-p25-mute-by-nac-code').show();
        $('#f-apco-p25-nac-code').show();
    }else{
        $('#f-apco-p25-mute-by-nac-code').hide();
        $('#f-apco-p25-nac-code').hide();
    }
    if ( selectedMode == MODE.D_CR.value ||
         selectedMode == MODE.AUTO.value ){
        $('#f-nxdn-mute-by-ran-code').show();
        $('#f-nxdn-ran-code').show();
    }else{
        $('#f-nxdn-mute-by-ran-code').hide();
        $('#f-nxdn-ran-code').hide();
    }
    if ( selectedMode == MODE.T_TC.value ){
        $('#f-ttc-slot-number').show();
    }else{
        $('#f-ttc-slot-number').hide();
    }
    switch( selectedMode ){
    case MODE.AM.value:
    case MODE.SAH.value:
    case MODE.SAL.value:
    case MODE.USB.value:
    case MODE.LSB.value:
    case MODE.CW.value: // analogReceiveMode != FM
        $('#f-agc').show();
        break;
    default:
        $('#f-agc').hide();
    }
    switch( selectedMode ){
    case MODE.DSTR.value:
    case MODE.YAES.value:
    case MODE.ALIN.value:
    case MODE.D_CR.value:
    case MODE.P_25.value:
    case MODE.DPMR.value:
    case MODE.DMR.value:
    case MODE.T_DM.value:
    case MODE.T_TC.value:
    case MODE.AUTO.value: //current_channel.digitalModeEnable == '1'
        $('#f-digital-data-output').show();
        break;
    default:
        $('#f-digital-data-output').hide();
    }
    if ( currentMemoryData.model == MODEL.AR_DV1.id){
        if ( selectedMode == MODE.FM.value ||
             selectedMode == MODE.AUTO.value
           ){
            $('#f-voice-squelch').show();
        }else{
            $('#f-voice-squelch').hide();
        }
        if ( selectedMode == MODE.FM.value ||
             selectedMode == MODE.AM.value ||
             selectedMode == MODE.SAH.value ||
             selectedMode == MODE.SAL.value ||
             selectedMode == MODE.USB.value ||
             selectedMode == MODE.LSB.value ||
             selectedMode == MODE.CW.value ||
             selectedMode == MODE.AUTO.value
           ){
            $('#f-auto-notch').show();
            $('#f-noise-reduction').show();
        }else{
            $('#f-auto-notch').hide();
            $('#f-noise-reduction').hide();
        }
    }else{
        $('#f-voice-squelch').hide();
        $('#f-auto-notch').hide();
        $('#f-noise-reduction').hide();
    }
    setDetailIFBW( selectedMode );
}
function selectSquelchType( selectedSquelchType ){
    if ( selectedSquelchType == SQUELCH_TYPE.CTC.value ||
         selectedSquelchType == SQUELCH_TYPE.REV_T.value){
        $('#f-tone-squelch-frequency').show();
    }else{
        $('#f-tone-squelch-frequency').hide();
    }
    if ( selectedSquelchType == SQUELCH_TYPE.DCS.value ){
        $('#f-dcs-code').show();
    }else{
        $('#f-dcs-code').hide();
    }
    if ( ( currentMemoryData.model == MODEL.AR_DV1.id &&
           selectedSquelchType == SQUELCH_TYPE.V_SCR.value )){
        $('#f-voice-descrambler-frequency').show();
    }else{
        $('#e-voice-descrambler-frequency').empty();
        $('#d-voice-descrambler-frequency').val('2000');
        $('#f-voice-descrambler-frequency').hide();
    }
}
function selectVoiceDescrambler( status ){
    if ( currentMemoryData.model == MODEL.AR_DV10.id ){
        if (status == '01'){
            $('#f-voice-descrambler-frequency').show();
        }else{
            $('#f-voice-descrambler-frequency').hide();
        }
    }
}
function initializeError(){
    $('#detail-error').empty();
    $('#detail-error').removeClass('error');
    $('#e-memory-tag').empty();
    $('#e-receive-frequency').text('');
    $('#e-receive-frequency').removeClass('error');
    $('#e-voice-descrambler-frequency').empty();
    $('#e-dcr-encryption-code').text('');
    $('#e-dcr-encryption-code').removeClass('error');
}
function setSquelchType( squelchType ){
    $('input[name="sqltype"]').prop('checked', false).checkboxradio('refresh');
    switch ( squelchType ){
    case SQUELCH_TYPE.OFF.value:
        $('#d-squelch-type1').prop('checked', true).checkboxradio('refresh');
        break;
    case SQUELCH_TYPE.CTC.value:
        $('#d-squelch-type2').prop('checked', true).checkboxradio('refresh');
        break;
    case SQUELCH_TYPE.DCS.value:
        $('#d-squelch-type3').prop('checked', true).checkboxradio('refresh');
        break;
    case SQUELCH_TYPE.V_SCR.value:
        $('#d-squelch-type4').prop('checked', true).checkboxradio('refresh');
        break;
    case SQUELCH_TYPE.REV_T.value:
        $('#d-squelch-type5').prop('checked', true).checkboxradio('refresh');
        break;
    default:
        $('#d-squelch-type1').prop('checked', true).checkboxradio('refresh');
        break;
    }
}
function showOffsetIndexValue( offsetIndex ){
    if( offsetIndex >= 0 && offsetIndex < 20 ){
        $('#d-offset-index-value').text('');
    }else if( offsetIndex >= 20 && offsetIndex < 40 ){
        $('#d-offset-index-value').text(OFFSET_FREQUENCY[offsetIndex] + 'MHz');
    }else{
        $('#d-offset-index-value').text('');
    }
}
function selectFrequencyStep( frequencyStepValue ){
    $('#d-frequency-step').val(frequencyStepValue).selectmenu('refresh');
    $('#d-step-adjust-frequency').empty();
    let frequencyStepkey = Object.keys(FREQUENCY_STEP).filter(function( key ){ return FREQUENCY_STEP[key].value == frequencyStepValue });
    let frequencyStep = FREQUENCY_STEP[frequencyStepkey];
    console.log( frequencyStep );
    if( frequencyStep ){
        for(let i = 0; i < frequencyStep.step_adjust_frequency.length; i++ ){
            let stepAdjustFrequency = frequencyStep.step_adjust_frequency[i];
            let option = $('<option>', { value: stepAdjustFrequency.value, text: stepAdjustFrequency.text });
            $('#d-step-adjust-frequency').append(option);
        }
        $('#d-step-adjust-frequency').val('000.00').selectmenu('refresh');
    }
}
function setDetail(){
    function initializeOption(){
        /* mode */
        $('#d-mode').empty();
        let modelModes = currentMemoryData.getModelMode();
        for( let i = 0; i < modelModes.length; i++ ){
            $('#d-mode').append(
                $('<option>', { value: modelModes[i].value,
                                name: modelModes[i].name,
                                text: modelModes[i].name
                              })
            );
        }
        /* squelch type */
        if ( currentMemoryData.model == MODEL.AR_DV10.id){
            $('#d-squelch-type4').parent().hide();
        }else{
            $('#d-squelch-type4').parent().show();
        }
        /* */
    }
    if( currentMemoryData.fileType == SD_BACKUP ){
        $('#d-bank-channel-l').text('BANK-CH');
        $('#f-recive-frequency').show();
    }else{
        $('#d-bank-channel-l').text('TEMPLATE NO');
        $('#f-recive-frequency').hide();
    }
    initializeError();
    initializeOption();
    if(navigator.language && navigator.language.toLowerCase().indexOf('ja') !== -1){
        $('#memory-tag-info').html(MEMORY_TAG_CHARACTOR_JA);
    }else{
        $('#memory-tag-info').html(MEMORY_TAG_CHARACTOR_EN);
    }
    selectFrequencyStep(current_channel.frequencyStep);
    $('#d-step-adjust-frequency').val(current_channel.stepAdjustFrequency).selectmenu('refresh');
    selectMode(current_channel.getMode());
    selectSquelchType(current_channel.getSquelchType());
    selectVoiceDescrambler(current_channel.voiceDescrambler);

    if ( current_channel.getMode() == MODE.FM.value ||
         current_channel.getMode() == MODE.AM.value ||
         current_channel.getMode() == MODE.SAH.value ||
         current_channel.getMode() == MODE.SAL.value ||
         current_channel.getMode() == MODE.USB.value ||
         current_channel.getMode() == MODE.LSB.value ||
         current_channel.getMode() == MODE.CW.value ){
        $('#d-if-bandwidth').val(current_channel.ifBandwidth).selectmenu('refresh');
    }

    $('#d-memory-bank').text(`${paddingZero(currentMemoryBankNo)}-${paddingZero(currentMemoryChannelNo)}`);
    $('#d-mode').val(current_channel.getMode()).selectmenu('refresh');
    setSquelchType(current_channel.squelchType);
    $('#d-receive-frequency').val(current_channel.receiveFrequency);
    $('#d-pass-channel').val(current_channel.passChannel).flipswitch('refresh');
    $('#d-memory-tag').val(current_channel.memoryTag);
    $('#d-write-protect').val(current_channel.writeProtect).flipswitch('refresh');
    $('input[name="sql"]').prop('checked', false).checkboxradio('refresh');
    switch ( current_channel.selectSquelch ){
    case '0':
        $('#d-select-squelch1').prop('checked', true).checkboxradio('refresh');
        break;
    case '1':
        $('#d-select-squelch2').prop('checked', true).checkboxradio('refresh');
        break;
    case '2':
        $('#d-select-squelch3').prop('checked', true).checkboxradio('refresh');
        break;
    default:
        //
    }
    $('#d-tone-squelch-frequency').val(current_channel.toneSquelchFrequency).selectmenu('refresh');
    $('#d-dcs-code').val(current_channel.dcsCode).selectmenu('refresh');
    $('input[name="agc"]').prop('checked', false).checkboxradio('refresh');
    switch ( current_channel.agc ){
    case '0':
        $('#d-agc1').prop('checked', true).checkboxradio('refresh');
        break;
    case '1':
        $('#d-agc2').prop('checked', true).checkboxradio('refresh');
        break;
    case '2':
        $('#d-agc3').prop('checked', true).checkboxradio('refresh');
        break;
    case '3':
        $('#d-agc4').prop('checked', true).checkboxradio('refresh');
        break;
    default:
        $('#d-agc1').prop('checked', true).checkboxradio('refresh');
    }
    if( current_channel.offsetIndex ){
        if ( current_channel.offsetIndex.substr(0,1) == '-'){
            $('#d-offset-index-sign').val('minus').selectmenu('refresh');
        }else{
            $('#d-offset-index-sign').val('plus').selectmenu('refresh');
        }
        $('#d-offset-index').val(current_channel.offsetIndex.substr(1)).selectmenu('refresh');
    }else{
        $('#d-offset-index-sign').val('minus').selectmenu('refresh');
        $('#d-offset-index').val('00').selectmenu('refresh');
    }
    showOffsetIndexValue($('#d-offset-index').val());
    $('#d-voice-descrambler').val(current_channel.voiceDescrambler).flipswitch('refresh');
    $('#d-voice-descrambler-frequency').val(Number(current_channel.voiceDescramblerFrequency, 10));
    $('#d-dcr-encryption-code').val(Number(current_channel.dcrEncryptionCode, 10));
    $('input[name="dmrslot"]').prop('checked', false).checkboxradio('refresh');
    switch ( current_channel.dmrSlotSelection ){
    case '0':
        $('#d-dmr-slot-selection1').prop('checked', true).checkboxradio('refresh');
        break;
    case '1':
        $('#d-dmr-slot-selection2').prop('checked', true).checkboxradio('refresh');
        break;
    case '2':
        $('#d-dmr-slot-selection3').prop('checked', true).checkboxradio('refresh');
        break;
    case '3':
        $('#d-dmr-slot-selection4').prop('checked', true).checkboxradio('refresh');
        break;
    default:
    }
    $('#d-dmr-mute-by-color-code').val(current_channel.dmrMuteByColorCode).flipswitch('refresh');
    $('#d-dmr-color-code').val(current_channel.dmrColorCode).selectmenu('refresh');
    $('#d-apco-p25-mute-by-nac-code').val(current_channel.apcoP25MuteByNACCode).flipswitch('refresh');
    $('#d-apco-p25-nac-code').val((current_channel.apcoP25NACCode).substr(2,3));
    $('#d-nxdn-mute-by-ran-code').val(current_channel.nxdnMuteByRANCode).flipswitch('refresh');
    $('#d-nxdn-ran-code').val(current_channel.nxdnRANCode).selectmenu('refresh');
    $('#d-ttc-slot-number').val(current_channel.ttcSlotNumber).selectmenu('refresh');
    $('#d-digital-data-output').val(current_channel.digitalDataOutput).flipswitch('refresh');
    $('#d-voice-squelch').text(current_channel.voiceSquelch);
    $('#d-auto-notch').text(current_channel.autoNotchName());
    $('#d-noise-reduction').text(current_channel.noiseReductionName());
}
function validateMemoryTag(){
    let valid = true;
    $('#e-memory-tag').empty();
    if( $('#d-memory-tag').val().match(MEMORY_TAG_REG) ){
        $('#e-memory-tag').append($('<p>', { class: 'error',
                                             text: '*Characters that cannot be used are included.'}));
        valid = false;
    }
    if( $('#d-memory-tag').val().length > 12 ){
        $('#e-memory-tag').append($('<p>', { class: 'error',
                                             text: '*The number of input characters exceeds 12 characters.'}));
        valid = false;
    }
    return valid;
}
function validateVoiceDescramblerFrequency(){
    $('#e-voice-descrambler-frequency').empty();
    if($('#d-voice-descrambler-frequency').val()){
        if( isNaN($('#d-voice-descrambler-frequency').val()) ||
            Number($('#d-voice-descrambler-frequency').val()) > 7000 ||
            Number($('#d-voice-descrambler-frequency').val()) < 2000 ||
            Number($('#d-voice-descrambler-frequency').val()) % 10 != 0
          ){
            $('#e-voice-descrambler-frequency').append(
                $('<p>', {class: 'error',
                          text: '*Please check V.SCR F. value.'
                         })
            );
            return false;
        }
    }else{
        $('#d-voice-descrambler-frequency').val('2000');
    }
    return true;
}
function validateReceiveFrequency(){
    $('#e-receive-frequency').text('');
    $('#e-receive-frequency').removeClass('error');
    if( parseFloat($('#d-receive-frequency').val()) < 0.1 ||
        parseFloat($('#d-receive-frequency').val()) > 1300 ){
        $('#e-receive-frequency').text('*FREQ is out of input range.');
        $('#e-receive-frequency').addClass('error');
        return false;
    }
    return true;
}
function validateDcrEncryptionCode(){
    $('#e-dcr-encryption-code').text('');
    $('#e-dcr-encryption-code').removeClass('error');
    if( Number($('#d-dcr-encryption-code').val()) < 0 ||
        Number($('#d-dcr-encryption-code').val()) > 32767 ){
        $('#e-dcr-encryption-code').text('*DCR ENC C. is out of input range.');
        $('#e-dcr-encryption-code').addClass('error');
        return false;
    }
    return true;
}
function validateChannelDetail(){
    initializeError();
    let errors = new Array;
    if( !validateReceiveFrequency() ){
        errors.push($('<li>', {text: 'FREQ'}));
    }
    if( !validateMemoryTag() ){
        errors.push($('<li>', {text: 'T:(TITLE)'}));
    }
    if( !validateVoiceDescramblerFrequency() ){
        errors.push($('<li>', {text: 'V.SCR F.'}));
    }
    if( !validateDcrEncryptionCode() ){
        errors.push($('<li>', {text: 'DCR ENC C.'}));
    }
    if( errors.length > 0 ){
        let ul = $('<ul>');
        for(let i = 0; i < errors.length; i++){
            ul.append(errors[i]);
        }
        $('#detail-error').append(
            $('<p>', {text: 'Error has occuerd.Please check the following items.'}),
            ul
        );
        $('#detail-error').addClass('error');
        return true;
    }else{
        return false;
    }
}
function channelConfirm(){
    current_channel.receiveFrequency = $('#d-receive-frequency').val();
    current_channel.frequencyStep = $('#d-frequency-step').val();
    current_channel.stepAdjustFrequency = $('#d-step-adjust-frequency').val();
    switch( $('#d-mode').val() ){
    case MODE.DSTR.value:
    case MODE.YAES.value:
    case MODE.ALIN.value:
    case MODE.D_CR.value:
    case MODE.P_25.value:
    case MODE.DPMR.value:
    case MODE.DMR.value:
    case MODE.T_DM.value:
    case MODE.T_TC.value:
    case MODE.AUTO.value:
        current_channel.digitalModeEnable = '1';
        current_channel.digitalDecodeMode = $('#d-mode').val();
        current_channel.analogReceiveMode = MODE.FM.value;
        break;
    default:
        current_channel.digitalModeEnable = '0';
        current_channel.analogReceiveMode = $('#d-mode').val();
        current_channel.digitalDecodeMode = '000';
    }
    current_channel.ifBandwidth = $('#d-if-bandwidth').val();
    current_channel.passChannel = $('#d-pass-channel').val();
    current_channel.memoryTag = $('#d-memory-tag').val();
    current_channel.writeProtect = $('#d-write-protect').val();
    current_channel.selectSquelch = $('input[name="sql"]:checked').val();
    current_channel.squelchType = $('input[name="sqltype"]:checked').val();
    current_channel.voiceDescrambler = $('#d-voice-descrambler').val();
    if( $('input[name="sqltype"]:checked').val() == SQUELCH_TYPE.V_SCR.value &&
        current_channel.model == MODEL.AR_DV1.id){
        current_channel.voiceDescrambler = '01';
    }
    current_channel.voiceDescramblerFrequency = $('#d-voice-descrambler-frequency').val();
    current_channel.toneSquelchFrequency = $('#d-tone-squelch-frequency').val();
    current_channel.dcsCode = $('#d-dcs-code').val();
    current_channel.agc = $('input[name="agc"]:checked').val();
    current_channel.offsetIndex = ($('#d-offset-index-sign').val() == 'minus' ? '-':'+') + $('#d-offset-index').val();
    current_channel.dcrEncryptionCode = ( '0000' + $('#d-dcr-encryption-code').val()).slice(-5);
    current_channel.dmrSlotSelection = $('input[name="dmrslot"]:checked').val();
    current_channel.dmrMuteByColorCode = $('#d-dmr-mute-by-color-code').val();
    current_channel.dmrColorCode = $('#d-dmr-color-code').val();
    current_channel.apcoP25MuteByNACCode = $('#d-apco-p25-mute-by-nac-code').val();
    current_channel.apcoP25NACCode = $('#d-apco-p25-nac-code').val();
    current_channel.nxdnMuteByRANCode = $('#d-nxdn-mute-by-ran-code').val();
    current_channel.nxdnRANCode = $('#d-nxdn-ran-code').val();
    current_channel.ttcSlotNumber = $('#d-ttc-slot-number').val();
    current_channel.digitalDataOutput = $('#d-digital-data-output').val();
    current_channel.channelRegistedFlg = '1';
}
$(document).on('click', '#channel-confirm',
               function(){
                   if( !validateChannelDetail() ){
                       channelConfirm();
                       updateLine(currentMemoryChannelNo);
                       $.mobile.changePage('#page-list');
                   }
               });
$(document).on('change', '#d-mode',
               function(){
                   selectMode($('#d-mode').val());
               });
$(document).on('change', 'input[name="sqltype"]:radio',
               function(){
                   selectSquelchType($(this).val());
               });
$(document).on('change','#d-voice-descrambler',
               function(){
                   selectVoiceDescrambler($(this).val());
               });
$(document).on('change','#d-memory-tag',
               function(){
                   validateMemoryTag();
               });
$(document).on('keyup','#d-apco-p25-nac-code',
               function(){
                   $('#d-apco-p25-nac-code').val($('#d-apco-p25-nac-code').val().replace(/[^a-fA-F0-9]/g, '').slice(0,3));
               });
$(document).on('change','#d-apco-p25-nac-code',
               function(){
                   $('#d-apco-p25-nac-code').val(
                       ('000' + $('#d-apco-p25-nac-code').val().replace(/[^a-fA-F0-9]/g, '').slice(0,3)).slice(-3));
               });
$(document).on('keyup','#d-receive-frequency',
               function(){
                   $(this).val($(this).val().replace(/[^0-9\.]/g, ''));
               });
$(document).on('change', '#d-receive-frequency',
               function(){
                   let input_value = $('#d-receive-frequency').val().split('.');
                   if( input_value.length == 1 && input_value[0] == '' ){
                       input_value = new Array;
                       input_value[0] = '0434';
                       input_value[1] = '40000';
                   }
                   if( input_value.length < 2 ){
                       $('#d-receive-frequency').val(('0000' + input_value[0]).slice(-4) + '.00000');
                   }else{
                       $('#d-receive-frequency').val(( '0000' + input_value[0]).slice(-4) + '.' + (input_value[1] + '00000').slice(0,5));
                   }
                   validateReceiveFrequency();
               });
$(document).on('change', '#d-voice-descrambler-frequency',
               function(){
                   validateVoiceDescramblerFrequency();
               });
$(document).on('change', '#d-dcr-encryption-code',
               function(){
                   if( !$(this).val() ){
                       $(this).val('0');
                   }else{
                       validateDcrEncryptionCode();
                   }
               });
$(document).on('change', '#d-offset-index',
               function(){
                   showOffsetIndexValue( Number($(this).val()) );
               });
$(document).on('change', '#d-frequency-step',
               function(){
                   selectFrequencyStep($(this).val());
               });
