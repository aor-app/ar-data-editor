class MemoryData {
    constructor(fileType, model, blockType, version, registeredAt = new Date, selectedMemoryBankNo, selectedMemoryChannelNo, banks){
        this.model = model;
        this.blockType = blockType;
        this._modelVersion = version;
        this.registeredAt = registeredAt;
        this.selectedMemoryBankNo = selectedMemoryBankNo;
        this.selectedMemoryChannelNo = selectedMemoryChannelNo;
        this._banks = banks;
        this.fileType = fileType;
    }
    get modelVersion(){ return this._modelVersion ? this._modelVersion : '( none )';}
    getModelMode(){
        switch ( this.model ){
        case 'AR-DV1':
            return MODEL.AR_DV1.mode;
        case 'AR-DV10':
            return MODEL.AR_DV10.mode;
        default:
            return null;
        }
    }
    getSquelchType(){
        switch ( this.model ){
        case 'AR-DV1':
            return MODEL.AR_DV1.squelchType;
        case 'AR-DV10':
            return MODEL.AR_DV10.squelchType;
        default:
            return null;
        }
    }
    getBankChannels( memoryBankNo ){
        return this._banks[memoryBankNo];
    }
    getBanks(){
        return this._banks.length;
    }
    getChannel( memoryBankNo, memoryChannelNo ){
        return this._banks[memoryBankNo][memoryChannelNo];
    }
    clearChannel( memoryBankNo, memoryChannelNo ){
        this._banks[memoryBankNo][memoryChannelNo] = new Channel();
        return this._banks[memoryBankNo][memoryChannelNo];
    }
    removeChannel( currentMemoryBankNo, memoryChannels ){
        function arrayMarge(bank, index){
            for(let i = index; i < MEMORY_CHANNEL_NUM - 1; i++){
                if( !bank[i] ){
                    if ( !bank[i + 1] ){
                        arrayMarge(bank, i + 1);
                    }
                    for(let j = i; j < MEMORY_CHANNEL_NUM - 1; j++){
                        bank[j] = bank[j + 1];
                    }
                    bank[MEMORY_CHANNEL_NUM - 1] = new Channel();
                }
            }
        }
        for(let i = 0; i < memoryChannels.length; i++){
            this._banks[currentMemoryBankNo][memoryChannels[i]] = null;
        }
        arrayMarge(this._banks[currentMemoryBankNo], 0);
    }
    cutInsertChannel( memoryBankNo, insertChannels, insertDestination ){
        if( memoryBankNo == insertChannels[0][0] ){
            let work = new Array;
            for(let i = 0; i < MEMORY_CHANNEL_NUM; i++){
                if ( i == insertDestination ){
                    for(let insert_i = 0; insert_i < insertChannels.length; insert_i++ ){
                        work.push(this._banks[insertChannels[insert_i][0]][insertChannels[insert_i][1]]);
                    }
                    work.push(this._banks[memoryBankNo][i]);
                }else if (insertChannels.some(function(currentValue, index, array){ return currentValue[1] == i; } )){
                    // pass
                }else{
                    work.push(this._banks[memoryBankNo][i]);
                }
            }
            this._banks[memoryBankNo] = work;
            return true;
        }else{
            let work = new Array;
            for(let i = 0; i < MEMORY_CHANNEL_NUM; i++){
                if ( i == insertDestination ){
                    for(let insert_i = 0; insert_i < insertChannels.length; insert_i++ ){
                        work.push(this._banks[insertChannels[insert_i][0]][insertChannels[insert_i][1]]);
                    }
                    work.push(this._banks[memoryBankNo][i]);
                }else{
                    work.push(this._banks[memoryBankNo][i]);
                }
            }
            let overBank = work.slice(MEMORY_CHANNEL_NUM);
            for(let i = 0;i < overBank.length; i++){
                if( overBank[i].channelRegistedFlg == '1' ){
                    return false;
                }
            }
            this._banks[memoryBankNo] = work;
            //
            let work2 = new Array;
            for(let i = 0; i < MEMORY_CHANNEL_NUM; i++){
                if (insertChannels.some(function(currentValue, index, array){ return currentValue[1] == i; } )){
                    // pass
                }else{
                    work2.push(this._banks[insertChannels[0][0]][i]);
                }
            }
            let addChannelNum = MEMORY_CHANNEL_NUM - work2.length;
            for(let i = 0; i < addChannelNum; i++){
                work2.push(new Channel());
            }
            this._banks[insertChannels[0][0]] = work2;
            return true;
        }
    }
    copyInsertChannel( memoryBankNo, insertChannels, insertDestination ){
        let work = new Array;
        for(let i = 0; i < MEMORY_CHANNEL_NUM; i++){
            if ( i == insertDestination ){
                for( let insert_i = 0; insert_i < insertChannels.length; insert_i++ ){
                    let copyChannel = new Channel(this._banks[insertChannels[insert_i][0]][insertChannels[insert_i][1]].data.slice(0));
                    work.push(copyChannel);
                }
                work.push(this._banks[memoryBankNo][i]);
            }else{
                work.push(this._banks[memoryBankNo][i]);
            }
        }
        let overBank = work.slice(MEMORY_CHANNEL_NUM);
        for(let i = 0;i < overBank.length; i++){
            if( overBank[i].channelRegistedFlg == '1' ){
                return false;
            }
        }
        this._banks[memoryBankNo] = work.slice(0, MEMORY_CHANNEL_NUM);
        return true;
    }
    moveUpChannel( memoryBankNo, memoryChannel ){
        if ( memoryChannel - 1 < 0 ){
            return;
        }else{
            let temp = this._banks[memoryBankNo][memoryChannel - 1];
            this._banks[memoryBankNo][memoryChannel - 1] = this._banks[memoryBankNo][memoryChannel];
            this._banks[memoryBankNo][memoryChannel] = temp;
        }
    }
    moveDownChannel( memoryBankNo, memoryChannel ){
        if ( memoryChannel > MEMORY_CHANNEL_NUM - 2){
            return;
        }else{
            let temp = this._banks[memoryBankNo][memoryChannel + 1];
            this._banks[memoryBankNo][memoryChannel + 1] = this._banks[memoryBankNo][memoryChannel];
            this._banks[memoryBankNo][memoryChannel] = temp;
        }
    }
    sortChannel( memoryBankNo, param ){
        if ( this.fileType == SD_BACKUP ){
            this._banks[memoryBankNo].sort(function(channelA, channelB){
                let blankChannelFrequency = ( param[0] == 'ASC' ? '9999.99999' : '0000.00000');
                let channelAFrequency = ( channelA.channelRegistedFlg == '0' ? blankChannelFrequency : channelA.receiveFrequency );
                let channelBFrequency = ( channelB.channelRegistedFlg == '0' ? blankChannelFrequency : channelB.receiveFrequency );
                if( channelAFrequency < channelBFrequency ){
                    return ( param[0] == 'ASC' ? -1 : 1 );
                }
                if ( channelAFrequency == channelBFrequency ){
                    if ( channelA.digitalDecodeMode < channelB.digitalDecodeMode ){
                        return ( param[1] == 'ASC' ? -1 : 1 );
                    }
                    if ( channelA.digitalDecodeMode > channelB.digitalDecodeMode ){
                        return ( param[1] == 'ASC' ? 1 : -1 );
                    }
                }
                if ( channelAFrequency > channelBFrequency ){
                    return ( param[0] == 'ASC' ? 1 : -1 );
                }
                return 0;
            });
        }else{
            this._banks[memoryBankNo].sort(function(channelA, channelB){
                let blankChannelDigitalDecodeMode = ( param[1] == 'ASC' ? '999' : '0');
                let channelADigitalDecodeMode = ( channelA.channelRegistedFlg == '0' ? blankChannelDigitalDecodeMode : channelA.digitalDecodeMode );
                let channelBDigitalDecodeMode = ( channelB.channelRegistedFlg == '0' ? blankChannelDigitalDecodeMode : channelB.digitalDecodeMode );
                if( channelADigitalDecodeMode < channelBDigitalDecodeMode ){
                    return ( param[1] == 'ASC' ? -1 : 1 );
                }
                if ( channelADigitalDecodeMode > channelBDigitalDecodeMode ){
                    return ( param[1] == 'ASC' ? 1 : -1 );
                }
                return 0;
            });
        }
    }
    createHdrArray(model){
        let exportModel = '';
        if (!model){
            exportModel = this.model;
        }else{
            exportModel = model;
        }
        return [this.fileType, 'MEM CH', exportModel, this._modelVersion, this.registeredAt];
//        return [this.fileType, this.blockType, this.model, ' ', this.registeredAt];
    }
    createMC0Array(){
        return ['MC0', this.selectedMemoryBankNo, this.selectedMemoryChannelNo];
    }
    createMC9Array(){
        return ['MC9'];
    }
    toCSVData(model){
        if ( model == this.model){
            model = null;
        }
        let csvArray = new Array;
        csvArray.push(this.createHdrArray(model));
        csvArray.push(this.createMC0Array());
        for( let bank_i = 0; bank_i < this._banks.length; bank_i++){
            for( let channel_i = 0; channel_i < this._banks[bank_i].length; channel_i++){
                let mcData = this._banks[bank_i][channel_i].getMCData(model);
                mcData.MC1[1] = ('00' + bank_i).slice(-2);
                mcData.MC1[2] = ('00' + channel_i).slice(-2);
                csvArray.push(mcData.MC1);
                csvArray.push(mcData.MC2);
                csvArray.push(mcData.MC3);
            }
        }
        // data
        csvArray.push(this.createMC9Array());
        return csvArray;
    }
}
