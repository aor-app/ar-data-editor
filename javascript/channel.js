class Channel {
    constructor(data){
        if( data ){
            this.data = data;
            // delete EOT(4)
            this.data[MC.MEMORY_TAG] = (data[MC.MEMORY_TAG].split('').map(function(value, index, array){ return value.charCodeAt(0) == 4 ? ' ' : value; })).join('');
            this.data[MC.RECEIVE_FREQUENCY] = this.formatReceiveFrequency(data[MC.RECEIVE_FREQUENCY]);
        }else{
            this.data = this.setDefaultData(new Array);
        }
    }
    get receiveFrequency(){
        return this.data[MC.RECEIVE_FREQUENCY];
    };
    set receiveFrequency( val ){
        this.data[MC.RECEIVE_FREQUENCY] = this.formatReceiveFrequency(val);
    };

    get frequencyStep(){ return this.data[MC.FREQUENCY_STEP];};
    set frequencyStep( val ){ this.data[MC.FREQUENCY_STEP] = val; };

    get stepAdjustFrequency(){ return this.data[MC.STEP_ADJUST_FREQUENCY];};
    set stepAdjustFrequency( val ){ this.data[MC.STEP_ADJUST_FREQUENCY] = val; };
    
    get offsetIndex(){ return this.data[MC.OFFSET_INDEX]; };
    set offsetIndex( val ){ this.data[MC.OFFSET_INDEX] = val; };

    get voiceDescramblerFrequency(){ return this.data[MC.VOICE_DESCRAMBLER_FREQUENCY]; };
    set voiceDescramblerFrequency( val ){ this.data[MC.VOICE_DESCRAMBLER_FREQUENCY] = val; };

    get dcrEncryptionCode(){ return this.data[MC.DCR_ENQRYPTION_CODE]; };
    set dcrEncryptionCode( val ){ this.data[MC.DCR_ENQRYPTION_CODE] = val; };

    get selectSquelch(){ return this.data[MC.SELECT_SQUELCH]; };
    set selectSquelch( val ){ this.data[MC.SELECT_SQUELCH] = val; };

    get agc(){ return this.data[MC.AGC]; };
    set agc( val ){ this.data[MC.AGC] = val; };

    get dmrSlotSelection(){ return this.data[MC.DMR_SLOT_SELECTION]; };
    set dmrSlotSelection( val ){ this.data[MC.DMR_SLOT_SELECTION] = val; };

    get squelchType(){ return this.data[MC.SQUELCH_TYPE]; };
    set squelchType( val ){ this.data[MC.SQUELCH_TYPE] = val; };

    get digitalDataOutput(){ return this.data[MC.DIGITAL_DATA_OUTPUT]; };
    set digitalDataOutput( val ){ this.data[MC.DIGITAL_DATA_OUTPUT] = val; };

    get digitalModeEnable(){ return this.data[MC.DIGITAL_MODE_ENABLE]; };
    set digitalModeEnable( val ){ this.data[MC.DIGITAL_MODE_ENABLE] = val; };

    get analogReceiveMode(){ return this.data[MC.ANALOG_RECEIVE_MODE]; };
    set analogReceiveMode( val ){ this.data[MC.ANALOG_RECEIVE_MODE] = val; };

    get digitalDecodeMode(){ return this.data[MC.DIGITAL_DECODE_MODE]; };
    set digitalDecodeMode( val ){ this.data[MC.DIGITAL_DECODE_MODE] = val; };

    get ifBandwidth(){ return this.data[MC.IF_BANDWIDTH]; };
    set ifBandwidth( val ){ this.data[MC.IF_BANDWIDTH] = val; };

    get toneSquelchFrequency(){ return this.data[MC.TONE_SQUELCH_FREQUENCY]; };
    set toneSquelchFrequency( val ){ this.data[MC.TONE_SQUELCH_FREQUENCY] = val; };

    get voiceDescrambler(){ return this.data[MC.VOICE_DESCRAMBLER]; };
    set voiceDescrambler( val ){ this.data[MC.VOICE_DESCRAMBLER] = val; };

    get dcsCode(){ return this.data[MC.DCS_CODE]; };
    set dcsCode( val ){ this.data[MC.DCS_CODE] = val; };

    get channelRegistedFlg(){ return this.data[MC.CHANNEL_REGISTERD_FLG]; };
    set channelRegistedFlg( val ){ this.data[MC.CHANNEL_REGISTERD_FLG] = val; };

    get passChannel(){ return this.data[MC.PASS_CHANNEL]; };
    set passChannel( val ){ this.data[MC.PASS_CHANNEL] = val; };

    get writeProtect(){ return this.data[MC.WRITE_PROTECT]; };
    set writeProtect( val ){ this.data[MC.WRITE_PROTECT] = val; };

    get memoryTag(){ return this.data[MC.MEMORY_TAG].trim(); };
    set memoryTag( val ){ this.data[MC.MEMORY_TAG] = val; };

    get dmrColorCode(){ return this.data[MC.DMR_COLOR_CODE]; };
    set dmrColorCode( val ){ this.data[MC.DMR_COLOR_CODE] = val; };

    get dmrMuteByColorCode(){ return this.data[MC.DMR_MUTE_BY_COLOR_CODE]; };
    set dmrMuteByColorCode( val ){ this.data[MC.DMR_MUTE_BY_COLOR_CODE] = val; };

    get apcoP25NACCode(){ return this.data[MC.APCO_P_25_NAC_CODE]; };
    set apcoP25NACCode( val ){ this.data[MC.APCO_P_25_NAC_CODE] = '0x' + val; };

    get apcoP25MuteByNACCode(){ return this.data[MC.APCO_P_25_MUTE_BY_NAC_CODE]; };
    set apcoP25MuteByNACCode( val ){ this.data[MC.APCO_P_25_MUTE_BY_NAC_CODE] = val; };

    get nxdnRANCode(){ return this.data[MC.NXDN_RAN_CODE]; };
    set nxdnRANCode( val ){ this.data[MC.NXDN_RAN_CODE] = val; };

    get nxdnMuteByRANCode(){ return this.data[MC.NXDN_MUTE_BY_RAN_CODE]; };
    set nxdnMuteByRANCode( val ){ this.data[MC.NXDN_MUTE_BY_RAN_CODE] = val; };

    get voiceSquelch(){ return this.data[MC.VOICE_SQUELCH]; };
    get autoNotch(){ return this.data[MC.AUTO_NOTCH]; };
    get noiseReduction(){ return this.data[MC.NOISE_REDIRECTION]; };

    formatReceiveFrequency( val ){
        if ( val ){
            let value = val.split('.');
            if(value.length < 2){
                return ('0000' + value[0]).slice(-4) + '.00000';
            }else{
                return ('0000' + value[0]).slice(-4) + '.' + (value[1] + '00000').slice(0,5);
            }
        }else{
            return val;
        }
    }

    modeDescription(){
        if ( this.digitalModeEnable == '1' ){
            return this.digitalDecodeModeName();
        }else{
            return this.analogReceiveModeDesc();
        }
    }
    digitalDecodeModeName(){
        let names = {'000': 'DSTR',
                     '001': 'YAES',
                     '002': 'ALIN',
                     '003': 'D-CR',
                     '004': 'P-25',
                     '005': 'dPMR',
                     '006': 'DMR',
                     '007': 'T-DM',
                     '128': 'AUTO'};
        return names[this.digitalDecodeMode];
    }
    analogReceiveModeDesc(){
        let list = {'0': {name: 'FM',
                          ifBandwidthList: ['200', '100','30', '15', '6']},
                    '1': {name: 'AM',
                          ifBandwidthList: ['15', '8', '5.5', '3.8']},
                    '2': {name: 'SAH',
                          ifBandwidthList: ['5.5', '3.8']},
                    '3': {name: 'SAL',
                          ifBandwidthList: ['5.5', '3.8']
                         },
                    '4': {name: 'USB',
                          ifBandwidthList: ['2.6', '1.8']},
                    '5': {name: 'LSB',
                          ifBandwidthList: ['2.6', '1.8']},
                    '6': {name: 'CW',
                          ifBandwidthList: ['500', '200']}
                   };
        let obj = list[this.analogReceiveMode];
        let squelchType = '';
        if ( this.analogReceiveMode == '0' &&
             ( this.ifBandwidth == 2 ||
               this.ifBandwidth == 3 ||
               this.ifBandwidth == 4 )){
            squelchType = ['OFF', 'CTC', 'DCS', 'V.SCR','REV.T'][this.squelchType];
        }
             return `${obj.name} ${obj.ifBandwidthList[this.ifBandwidth]} ${squelchType}`;
    }
    autoNotchName(){
        switch( this.autoNotch ){
        case '0': return 'OFF';
        case '1': return 'Low';
        case '2': return 'Mid';
        case '3': return 'High';
        default: return '';
        }
    }
    noiseReductionName(){
        switch( this.noiseReduction ){
        case '0': return 'OFF';
        case '1': return 'Low';
        case '2': return 'Mid';
        case '3': return 'High';
        default: return '';
        }
    }
    getMode(){
        if ( this.digitalModeEnable == '0') {
            return this.analogReceiveMode
        }else{
            return this.digitalDecodeMode
        }
    }
    getSquelchType(){
        if ( this.getMode() == MODE.FM.value ||
             this.getMode() == MODE.AUTO.value ){
            return this.squelchType;
        }else{
            return null;
        }
    }
    toString(){
        return this.data.join(",");
    }
    getModelConvertedData(model){
        let data = this.data.slice(0);

        switch ( model ){
        case 'AR-DV10':         //DV1->DV10
            data[MC.CW_PITCH] = '0600';
            data[MC.VOICE_SQUELCH] = '0';
            data[MC.AUTO_NOTCH] = '0';
            data[MC.NOISE_REDIRECTION] = '0';
            if ( data[MC.ANALOG_RECEIVE_MODE] == '2' ||
                 data[MC.ANALOG_RECEIVE_MODE] == '3' ){
                data[MC.ANALOG_RECEIVE_MODE] = '1';
            }
            if ( data[MC.SQUELCH_TYPE] == '3'){
                data[MC.SQUELCH_TYPE] = '0';
                data[MC.VOICE_DESCRAMBLER] = '01';
            }else{
                data[MC.VOICE_DESCRAMBLER] = '00';
            }
            if( this.getMode() == MODE.FM.value ){
                if ( data[MC.IF_BANDWIDTH] == '0' ){
                    data[MC.IF_BANDWIDTH] = '1';
                }
            }
            break;
        case 'AR-DV1':
            data[MC.CW_PITCH] = '0600';
            data[MC.VOICE_SQUELCH] = '0';
            data[MC.AUTO_NOTCH] = '0';
            data[MC.NOISE_REDIRECTION] = '0';
            if ( data[MC.VOICE_DESCRAMBLER] == '01' ){
                data[MC.SQUELCH_TYPE] = '3';
            }
        default:
        }
        return data;
    }
    getData(model){
        let data = this.getModelConvertedData(model); //copy
        data[MC.MEMORY_TAG] = (data[MC.MEMORY_TAG] + '            ').slice(0, 12);
        return data;
    }
    setDefaultData(array){
        array[MC.MC1_ROWNAME] = 'MC1';
        array[MC.MEMORY_BANK] = null;
        array[MC.MEMORY_CHANNEL] = null;
        array[MC.RECEIVE_FREQUENCY] = '0434.40000';
        array[MC.FREQUENCY_STEP] = '020.00';
        array[MC.STEP_ADJUST_FREQUENCY] = '000.00';
        array[MC.OFFSET_INDEX] = '+00';
        array[MC.DUMMY1] = '+00000';
        array[MC.CW_PITCH] = '0600';
        array[MC.VOICE_DESCRAMBLER_FREQUENCY] = '2000';
        array[MC.DCR_ENQRYPTION_CODE] = '00000';
        array[MC.VOICE_SQUELCH] = '0';
        array[MC.SELECT_SQUELCH] = '2';
        array[MC.AGC] = '0';
        array[MC.DUMMY2] = '0x0000';
        array[MC.MC2_ROWNAME] = 'MC2';
        array[MC.AUTO_NOTCH] = '0';
        array[MC.NOISE_REDIRECTION] = '0';
        array[MC.DMR_SLOT_SELECTION] = '0';
        array[MC.SQUELCH_TYPE] = '0';
        array[MC.DIGITAL_DATA_OUTPUT] = '1';
        array[MC.DIGITAL_MODE_ENABLE] = '0';
        array[MC.ANALOG_RECEIVE_MODE] = '0';
        array[MC.DIGITAL_DECODE_MODE] = '000';
        array[MC.IF_BANDWIDTH] = '3';
        array[MC.TONE_SQUELCH_FREQUENCY] = '00';
        array[MC.VOICE_DESCRAMBLER] = '00';
        array[MC.DCS_CODE] = '00';
        array[MC.CHANNEL_REGISTERD_FLG] = '0';
        array[MC.DUMMY3] = '0';
        array[MC.PASS_CHANNEL] = '0';
        array[MC.DUMMY4] = '0';
        array[MC.WRITE_PROTECT] = '0';
        array[MC.DUMMY5] = '00';
        array[MC.MEMORY_TAG] = '';
        array[MC.MC3_ROWNAME] = 'MC3';
        array[MC.DMR_COLOR_CODE] = '00';
        array[MC.DMR_MUTE_BY_COLOR_CODE] = '0';
        array[MC.DUMMY6] = '0';
        array[MC.APCO_P_25_NAC_CODE] = '0x000';
        array[MC.APCO_P_25_MUTE_BY_NAC_CODE] = '0';
        array[MC.DUMMY7] = '0';
        array[MC.NXDN_RAN_CODE] = '00';
        array[MC.NXDN_MUTE_BY_RAN_CODE] = '0';
        array[MC.DUMMY8] = '0';
        return array;
    }

}
