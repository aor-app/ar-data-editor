let receiverModel = null;
const socket = io();
$(function(){
    function writeLocalDataToReceiver(receiverModel){
        let banks = currentMemoryData.getData(receiverModel);
        socket.emit('writeMemoryChannel', {banks: banks});
    }
    socket.on('readMemoryChannelResult', function(result) {
        hideLoadingAnimation();
        if (!result) {
            showErrorPopup('An error occurred.');
            return false;
        }
        if (result.code === -1) {
            showErrorPopup('The receiver is busy.Please do it after a while.');
            console.log('machine is busy');
            return false;
        }
        if (result.code !== 0) {
            showErrorPopup(result.message);
            console.log(result);
            return false;
        }

        let data = result.data;
        let registeredDate = new Date;
        let registeredDateStr = `${registeredDate.getFullYear()}/${paddingZero(registeredDate.getMonth() + 1)}/${paddingZero(registeredDate.getDate())} ${paddingZero(registeredDate.getHours())}:${paddingZero(registeredDate.getMinutes())}:${paddingZero(registeredDate.getSeconds())}`;
        let banks = [];
        for(let bankNo = 0; bankNo < MEMORY_BANK_NUM; bankNo++) {
            let bank = [];
            for(let channelNo = 0; channelNo < MEMORY_CHANNEL_NUM; channelNo++){
                bank[channelNo] = new Channel(data.banks[bankNo][channelNo]);
                console.log(bankNo + ':' + channelNo);
            }
            banks[bankNo] = bank;
        }
        receiverModel = data.model;
        currentMemoryData = new MemoryData(
            SD_BACKUP,
            data.model,
            'MEM CH',
            data.version,
            registeredDateStr,
            '00',
            '00',
            banks);
        setEditMode(SD_BACKUP);
        $('#file-name').text('(Receiver Data)');
        showCompletePopup('Reading process done.');
    });
    socket.on('writeMemoryChannelResult', function(result) {
        hideLoadingAnimation();
        console.log(result);
        if (!result) {
            showErrorPopup('An error occurred.');
            return false;
        }
        if (result.code === -1){
            showErrorPopup('The receiver is busy.Please do it after a while.');
            console.log('machine is busy');
            return false;
        }
        if (result.code !== 0) {
            showErrorPopup(result.message);
            console.log(result);
            return false;
        }
        showCompletePopup('Writing process done.');
    });
    socket.on('getModel', function(result){
        if (!result) return false;
        if (result.code === -1){
            console.log('machine is busy');
            return false;
        }
        receiverModel = result.model;
        console.log(result);
        writeLocalDataToReceiver(receiverModel);
    });

    $(document).on('click', '#write-btn',
                   function() {
                       if( currentMemoryData ){
                           validateMemoryDataNumWithWarningPopup(function(){
                               console.log('writing....');
                               showLoadingAnimation("Writing data to receiver...");
                               if( receiverModel ){
                                   writeLocalDataToReceiver(receiverModel);
                               }else{
                                   socket.emit('getModel');
                                   return ;
                               }
                           });
                       }else{
                           showErrorPopup('No Data.');
                       }
                   });
    $(document).on('click', '#read-btn',
                   function() {
                       console.log('Reading ...');
                       showLoadingAnimation("Reading data from receiver...");
                       socket.emit('readMemoryChannel');
                   });
    $(document).on('click', '#settings-btn',
                   function(){
                       $('#fn-settings').popup('open');
                   });
    $(document).on('click', '#fn-settings-update',
                   function(){
                       $('#fn-settings').popup('close');
                       showLoadingAnimation("Update check...");
                       socket.emit('checkUpdate');
                       // socket update check
                       // confirm window
                       // ok -> update data-editor memory-server
                       //showLoadingAnimation("Update check...");
                   });
})
