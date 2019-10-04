const VERSION = '1.1.5';
const MEMORY_BANK_NUM = 40;
const MEMORY_CHANNEL_NUM = 50;
const SD_BACKUP = 'SD-BACKUP';
const MEMORY_CHANNEL_FILE_PREFIX = 'mc';
const TEMPLATE_FILE = 'TEMPLATE-FILE';
const TEMPLATE_FILE_PREFIX = 'tp';
const MC = {
    MC1_ROWNAME:                  0,
    MEMORY_BANK:                  1,
    MEMORY_CHANNEL:               2,
    RECEIVE_FREQUENCY:            3,
    FREQUENCY_STEP:               4,
    STEP_ADJUST_FREQUENCY:        5,
    OFFSET_INDEX:                 6,
    DUMMY1:                       7,
    CW_PITCH:                     8,
    VOICE_DESCRAMBLER_FREQUENCY:  9,
    DCR_ENQRYPTION_CODE:         10,
    VOICE_SQUELCH:               11,
    SELECT_SQUELCH:              12,
    AGC:                         13,
    DUMMY2:                      14,
    //MC2
    MC2_ROWNAME:                 15,
    AUTO_NOTCH:                  16,
    NOISE_REDIRECTION:           17,
    DMR_SLOT_SELECTION:          18,
    SQUELCH_TYPE:                19,
    DIGITAL_DATA_OUTPUT:         20,
    DIGITAL_MODE_ENABLE:         21,
    ANALOG_RECEIVE_MODE:         22,
    DIGITAL_DECODE_MODE:         23,
    IF_BANDWIDTH:                24,
    TONE_SQUELCH_FREQUENCY:      25,
    VOICE_DESCRAMBLER:           26,
    DCS_CODE:                    27,
    CHANNEL_REGISTERD_FLG:       28,
    DUMMY3:                      29,
    PASS_CHANNEL:                30,
    DUMMY4:                      31,
    WRITE_PROTECT:               32,
    DUMMY5:                      33,
    MEMORY_TAG:                  34,
    //MC3
    MC3_ROWNAME:                 35,
    DMR_COLOR_CODE:              36,
    DMR_MUTE_BY_COLOR_CODE:      37,
    DUMMY6:                      38,
    APCO_P_25_NAC_CODE:          39,
    APCO_P_25_MUTE_BY_NAC_CODE:  40,
    DUMMY7:                      41,
    NXDN_RAN_CODE:               42,
    NXDN_MUTE_BY_RAN_CODE:       43,
    DUMMY8:                      44
};
const MODE = {
    FM: { value: '0', name: 'FM'},
    AM: { value: '1', name: 'AM'},
    SAH: { value: '2', name: 'SAH'},
    SAL: { value: '3', name: 'SAL'},
    USB: { value: '4', name: 'USB'},
    LSB: { value: '5', name: 'LSB'},
    CW: { value: '6', name: 'CW'},
    DSTR: { value: '000', name: 'DSTR'},
    YAES: { value: '001', name: 'YAES'},
    ALIN: { value: '002', name: 'ALIN'},
    D_CR: { value: '003', name: 'D-CR'},
    P_25: { value: '004', name: 'P-25'},
    DPMR: { value: '005', name: 'dPMR'},
    DMR:  { value: '006', name: 'DMR'},
    T_DM: { value: '007', name: 'T-DM'},
    AUTO: { value: '128', name: 'AUTO'}
};
const SQUELCH_TYPE = {
    OFF: { value: '0', name: 'OFF'},
    CTC: { value: '1', name: 'CTC'},
    DCS: { value: '2', name: 'DCS'},
    V_SCR: { value: '3', name: 'V.SCR'},
    REV_T: { value: '4', name: 'REV.T'}
};
const MODEL = {
    AR_DV10: {
        id: 'AR-DV10',
        mode: [ MODE.FM,
                MODE.AM,
                MODE.USB,
                MODE.LSB,
                MODE.CW,
                MODE.DSTR,
                MODE.YAES,
                MODE.ALIN,
                MODE.D_CR,
                MODE.P_25,
                MODE.DPMR,
                MODE.DMR,
                MODE.T_DM,
                MODE.AUTO
              ],
        squelchType: [
            SQUELCH_TYPE.OFF,
            SQUELCH_TYPE.CTC,
            SQUELCH_TYPE.DCS,
            SQUELCH_TYPE.REV_T
        ]},
    AR_DV1: {
        id: 'AR-DV1',
        mode: [ MODE.FM,
                MODE.AM,
                MODE.SAH,
                MODE.SAL,
                MODE.USB,
                MODE.LSB,
                MODE.CW,
                MODE.DSTR,
                MODE.YAES,
                MODE.ALIN,
                MODE.D_CR,
                MODE.P_25,
                MODE.DPMR,
                MODE.DMR,
                MODE.T_DM,
                MODE.AUTO
              ],
        squelchType: [
            SQUELCH_TYPE.OFF,
            SQUELCH_TYPE.CTC,
            SQUELCH_TYPE.DCS,
            SQUELCH_TYPE.V_SCR,
            SQUELCH_TYPE.REV_T
        ]}
};
const MEMORY_TAG_REG = new RegExp(/[^｡｢｣､･ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝﾞﾟ !"#\$%&\'\(\)\*\+\,\-\.\/0123456789:;<=>\?@ABCDEFGHIJKLMNOPQRSTUVWXYZ\[\\\]\^_`abcdefghijklmnopqrstuvwxyz\{\|\}\~]/, 'g');
const MEMORY_TAG_CHARACTOR_JA = '｡｢｣､･ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝﾞﾟ&nbsp;!&quot;#$%&amp;\&apos;()*+,-./0123456789:;&gt;=&lt;?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~';
const MEMORY_TAG_CHARACTOR_EN = '&nbsp;!&quot;#$%&amp;\&apos;()*+,-./0123456789:;&gt;=&lt;?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~';
const OFFSET_FREQUENCY = {
    20: '0.10000',
    21: '4.00000',
    22: '4.60000',
    23: '5.00000',
    24: '8.00000',
    25: '9.00000',
    26: '10.00000',
    27: '15.00000',
    28: '16.00000',
    29: '16.50000',
    30: '18.00000',
    31: '18.45000',
    32: '20.00000',
    33: '24.10000',
    34: '37.40000',
    35: '47.20000',
    36: '48.00000',
    37: '55.00000',
    38: '126.35000',
    39: '130.00000'
};
const STEP_ADJUST_FREQUENCY = {
    '0HZ': { text: '0Hz', value: '000.00' },
    '50HZ': { text: '50Hz', value: '000.05' },
    '0.25KHZ': {text: '0.25kHz', value: '000.25' },
    '0.5KHZ': { text: '0.5kHz', value: '000.50' },
    '1KHZ': { text: '1kHz', value: '001.00' },
    '2.5KHZ': { text: '2.5kHz', value: '002.50' },
    '3.12KHZ': { text: '3.12kHz', value: '003.12' },
    '3.75KHZ': { text: '3.75kHz', value: '003.75' },
    '4.16KHZ': { text: '4.16kHz', value: '004.16' },
    '4.5KHZ': { text: '4.5kHz', value: '004.50' },
    '5KHZ': { text: '5kHz', value: '005.00' },
    '6.25KHZ': { text: '6.25kHz', value: '006.25' },
    '7.5KHZ': { text: '7.5kHz', value: '007.50' },
    '10KHZ': { text: '10kHz', value: '010.00' },
    '12.5KHZ': { text: '12.5kHz', value: '012.50' },
    '15KHZ': { text: '15kHz', value: '015.00' },
    '20KHZ': { text: '20kHz', value: '020.00' },
    '25KHZ': { text: '25kHz', value: '025.00' },
    '50KHZ': { text: '50kHz', value: '050.00' },
    '250KHZ': { text: '250kHz', value: '250.00'}
}
const FREQUENCY_STEP = {
    '10HZ': {
        text: '10Hz',
        value: '000.01',
        step_adjust_frequency: [
            STEP_ADJUST_FREQUENCY['0HZ']
        ]
    },
    '50HZ': {
        text: '50Hz',
        value: '000.05',
        step_adjust_frequency: [
            STEP_ADJUST_FREQUENCY['0HZ']
        ]
    },
    '0.1KHZ': {
        text: '0.1kHz',
        value: '000.10',
        step_adjust_frequency: [
            STEP_ADJUST_FREQUENCY['0HZ'],
            STEP_ADJUST_FREQUENCY['50HZ']
        ]
    },
    '0.5KHZ': {
        text: '0.5kHz',
        value: '000.50',
        step_adjust_frequency: [
            STEP_ADJUST_FREQUENCY['0HZ'],
            STEP_ADJUST_FREQUENCY['50HZ'],
            STEP_ADJUST_FREQUENCY['0.25KHZ']
        ]
    },
    '1KHZ': {
        text: '1kHz',
        value: '001.00',
        step_adjust_frequency: [
            STEP_ADJUST_FREQUENCY['0HZ'],
            STEP_ADJUST_FREQUENCY['50HZ'],
            STEP_ADJUST_FREQUENCY['0.25KHZ'],
            STEP_ADJUST_FREQUENCY['0.5KHZ']
        ]
    },
    '2KHZ': {
        text: '2kHz',
        value: '002.00',
        step_adjust_frequency: [
            STEP_ADJUST_FREQUENCY['0HZ'],
            STEP_ADJUST_FREQUENCY['50HZ'],
            STEP_ADJUST_FREQUENCY['0.25KHZ'],
            STEP_ADJUST_FREQUENCY['0.5KHZ'],
            STEP_ADJUST_FREQUENCY['1KHZ']
        ]
    },
    '5KHZ': {
        text: '5kHz',
        value: '005.00',
        step_adjust_frequency: [
            STEP_ADJUST_FREQUENCY['0HZ'],
            STEP_ADJUST_FREQUENCY['50HZ'],
            STEP_ADJUST_FREQUENCY['0.25KHZ'],
            STEP_ADJUST_FREQUENCY['0.5KHZ'],
            STEP_ADJUST_FREQUENCY['1KHZ'],
            STEP_ADJUST_FREQUENCY['2.5KHZ']
        ]
    },
    '6.25KHZ': {
        text: '6.25kHz',
        value: '006.25',
        step_adjust_frequency: [
            STEP_ADJUST_FREQUENCY['0HZ'],
            STEP_ADJUST_FREQUENCY['50HZ'],
            STEP_ADJUST_FREQUENCY['0.25KHZ'],
            STEP_ADJUST_FREQUENCY['0.5KHZ'],
            STEP_ADJUST_FREQUENCY['1KHZ'],
            STEP_ADJUST_FREQUENCY['2.5KHZ'],
            STEP_ADJUST_FREQUENCY['3.12KHZ']
        ]
    },
    '7.5KHZ': {
        text: '7.5kHz',
        value: '007.50',
        step_adjust_frequency: [
            STEP_ADJUST_FREQUENCY['0HZ'],
            STEP_ADJUST_FREQUENCY['50HZ'],
            STEP_ADJUST_FREQUENCY['0.25KHZ'],
            STEP_ADJUST_FREQUENCY['0.5KHZ'],
            STEP_ADJUST_FREQUENCY['1KHZ'],
            STEP_ADJUST_FREQUENCY['2.5KHZ'],
            STEP_ADJUST_FREQUENCY['3.12KHZ'],
            STEP_ADJUST_FREQUENCY['3.75KHZ']
        ]
    },
    '8.33KHZ': {
        text: '8.33kHz',
        value: '008.33',
        step_adjust_frequency: [
            STEP_ADJUST_FREQUENCY['0HZ'],
            STEP_ADJUST_FREQUENCY['50HZ'],
            STEP_ADJUST_FREQUENCY['0.25KHZ'],
            STEP_ADJUST_FREQUENCY['0.5KHZ'],
            STEP_ADJUST_FREQUENCY['1KHZ'],
            STEP_ADJUST_FREQUENCY['2.5KHZ'],
            STEP_ADJUST_FREQUENCY['3.12KHZ'],
            STEP_ADJUST_FREQUENCY['3.75KHZ'],
            STEP_ADJUST_FREQUENCY['4.16KHZ']
        ]
    },
    '9KHZ': {
        text: '9kHz',
        value: '009.00',
        step_adjust_frequency: [
            STEP_ADJUST_FREQUENCY['0HZ'],
            STEP_ADJUST_FREQUENCY['50HZ'],
            STEP_ADJUST_FREQUENCY['0.25KHZ'],
            STEP_ADJUST_FREQUENCY['0.5KHZ'],
            STEP_ADJUST_FREQUENCY['1KHZ'],
            STEP_ADJUST_FREQUENCY['2.5KHZ'],
            STEP_ADJUST_FREQUENCY['3.12KHZ'],
            STEP_ADJUST_FREQUENCY['3.75KHZ'],
            STEP_ADJUST_FREQUENCY['4.16KHZ'],
            STEP_ADJUST_FREQUENCY['4.5KHZ']
        ]
    },
    '10KHZ': {
        text: '10kHz',
        value: '010.00',
        step_adjust_frequency: [
            STEP_ADJUST_FREQUENCY['0HZ'],
            STEP_ADJUST_FREQUENCY['50HZ'],
            STEP_ADJUST_FREQUENCY['0.25KHZ'],
            STEP_ADJUST_FREQUENCY['0.5KHZ'],
            STEP_ADJUST_FREQUENCY['1KHZ'],
            STEP_ADJUST_FREQUENCY['2.5KHZ'],
            STEP_ADJUST_FREQUENCY['3.12KHZ'],
            STEP_ADJUST_FREQUENCY['3.75KHZ'],
            STEP_ADJUST_FREQUENCY['4.16KHZ'],
            STEP_ADJUST_FREQUENCY['4.5KHZ'],
            STEP_ADJUST_FREQUENCY['5KHZ']
        ]
    },
    '12.5KHZ': {
        text: '12.5kHz',
        value: '012.50',
        step_adjust_frequency: [
            STEP_ADJUST_FREQUENCY['0HZ'],
            STEP_ADJUST_FREQUENCY['50HZ'],
            STEP_ADJUST_FREQUENCY['0.25KHZ'],
            STEP_ADJUST_FREQUENCY['0.5KHZ'],
            STEP_ADJUST_FREQUENCY['1KHZ'],
            STEP_ADJUST_FREQUENCY['2.5KHZ'],
            STEP_ADJUST_FREQUENCY['3.12KHZ'],
            STEP_ADJUST_FREQUENCY['3.75KHZ'],
            STEP_ADJUST_FREQUENCY['4.16KHZ'],
            STEP_ADJUST_FREQUENCY['4.5KHZ'],
            STEP_ADJUST_FREQUENCY['5KHZ'],
            STEP_ADJUST_FREQUENCY['6.25KHZ']
        ]
    },
    '15KHZ': {
        text: '15kHz',
        value: '015.00',
        step_adjust_frequency: [
            STEP_ADJUST_FREQUENCY['0HZ'],
            STEP_ADJUST_FREQUENCY['50HZ'],
            STEP_ADJUST_FREQUENCY['0.25KHZ'],
            STEP_ADJUST_FREQUENCY['0.5KHZ'],
            STEP_ADJUST_FREQUENCY['1KHZ'],
            STEP_ADJUST_FREQUENCY['2.5KHZ'],
            STEP_ADJUST_FREQUENCY['3.12KHZ'],
            STEP_ADJUST_FREQUENCY['3.75KHZ'],
            STEP_ADJUST_FREQUENCY['4.16KHZ'],
            STEP_ADJUST_FREQUENCY['4.5KHZ'],
            STEP_ADJUST_FREQUENCY['5KHZ'],
            STEP_ADJUST_FREQUENCY['6.25KHZ'],
            STEP_ADJUST_FREQUENCY['7.5KHZ']
        ]
    },
    '20KHZ': {
        text: '20kHz',
        value: '020.00',
        step_adjust_frequency: [
            STEP_ADJUST_FREQUENCY['0HZ'],
            STEP_ADJUST_FREQUENCY['50HZ'],
            STEP_ADJUST_FREQUENCY['0.25KHZ'],
            STEP_ADJUST_FREQUENCY['0.5KHZ'],
            STEP_ADJUST_FREQUENCY['1KHZ'],
            STEP_ADJUST_FREQUENCY['2.5KHZ'],
            STEP_ADJUST_FREQUENCY['3.12KHZ'],
            STEP_ADJUST_FREQUENCY['3.75KHZ'],
            STEP_ADJUST_FREQUENCY['4.16KHZ'],
            STEP_ADJUST_FREQUENCY['4.5KHZ'],
            STEP_ADJUST_FREQUENCY['5KHZ'],
            STEP_ADJUST_FREQUENCY['6.25KHZ'],
            STEP_ADJUST_FREQUENCY['7.5KHZ'],
            STEP_ADJUST_FREQUENCY['10KHZ']
        ]
    },
    '25KHZ': {
        text: '25kHz',
        value: '025.00',
        step_adjust_frequency: [
            STEP_ADJUST_FREQUENCY['0HZ'],
            STEP_ADJUST_FREQUENCY['50HZ'],
            STEP_ADJUST_FREQUENCY['0.25KHZ'],
            STEP_ADJUST_FREQUENCY['0.5KHZ'],
            STEP_ADJUST_FREQUENCY['1KHZ'],
            STEP_ADJUST_FREQUENCY['2.5KHZ'],
            STEP_ADJUST_FREQUENCY['3.12KHZ'],
            STEP_ADJUST_FREQUENCY['3.75KHZ'],
            STEP_ADJUST_FREQUENCY['4.16KHZ'],
            STEP_ADJUST_FREQUENCY['4.5KHZ'],
            STEP_ADJUST_FREQUENCY['5KHZ'],
            STEP_ADJUST_FREQUENCY['6.25KHZ'],
            STEP_ADJUST_FREQUENCY['7.5KHZ'],
            STEP_ADJUST_FREQUENCY['10KHZ'],
            STEP_ADJUST_FREQUENCY['12.5KHZ']
        ]
    },
    '30KHZ': {
        text: '30kHz',
        value: '030.00',
        step_adjust_frequency: [
            STEP_ADJUST_FREQUENCY['0HZ'],
            STEP_ADJUST_FREQUENCY['50HZ'],
            STEP_ADJUST_FREQUENCY['0.25KHZ'],
            STEP_ADJUST_FREQUENCY['0.5KHZ'],
            STEP_ADJUST_FREQUENCY['1KHZ'],
            STEP_ADJUST_FREQUENCY['2.5KHZ'],
            STEP_ADJUST_FREQUENCY['3.12KHZ'],
            STEP_ADJUST_FREQUENCY['3.75KHZ'],
            STEP_ADJUST_FREQUENCY['4.16KHZ'],
            STEP_ADJUST_FREQUENCY['4.5KHZ'],
            STEP_ADJUST_FREQUENCY['5KHZ'],
            STEP_ADJUST_FREQUENCY['6.25KHZ'],
            STEP_ADJUST_FREQUENCY['7.5KHZ'],
            STEP_ADJUST_FREQUENCY['10KHZ'],
            STEP_ADJUST_FREQUENCY['12.5KHZ'],
            STEP_ADJUST_FREQUENCY['15KHZ']
        ]
    },
    '50KHZ': {
        text: '50kHz',
        value: '050.00',
        step_adjust_frequency: [
            STEP_ADJUST_FREQUENCY['0HZ'],
            STEP_ADJUST_FREQUENCY['50HZ'],
            STEP_ADJUST_FREQUENCY['0.25KHZ'],
            STEP_ADJUST_FREQUENCY['0.5KHZ'],
            STEP_ADJUST_FREQUENCY['1KHZ'],
            STEP_ADJUST_FREQUENCY['2.5KHZ'],
            STEP_ADJUST_FREQUENCY['3.12KHZ'],
            STEP_ADJUST_FREQUENCY['3.75KHZ'],
            STEP_ADJUST_FREQUENCY['4.16KHZ'],
            STEP_ADJUST_FREQUENCY['4.5KHZ'],
            STEP_ADJUST_FREQUENCY['5KHZ'],
            STEP_ADJUST_FREQUENCY['6.25KHZ'],
            STEP_ADJUST_FREQUENCY['7.5KHZ'],
            STEP_ADJUST_FREQUENCY['10KHZ'],
            STEP_ADJUST_FREQUENCY['12.5KHZ'],
            STEP_ADJUST_FREQUENCY['15KHZ'],
            STEP_ADJUST_FREQUENCY['20KHZ'],
            STEP_ADJUST_FREQUENCY['25KHZ']
        ]
    },
    '100KHZ': {
        text: '100kHz',
        value: '100.00',
        step_adjust_frequency: [
            STEP_ADJUST_FREQUENCY['0HZ'],
            STEP_ADJUST_FREQUENCY['50HZ'],
            STEP_ADJUST_FREQUENCY['0.25KHZ'],
            STEP_ADJUST_FREQUENCY['0.5KHZ'],
            STEP_ADJUST_FREQUENCY['1KHZ'],
            STEP_ADJUST_FREQUENCY['2.5KHZ'],
            STEP_ADJUST_FREQUENCY['3.12KHZ'],
            STEP_ADJUST_FREQUENCY['3.75KHZ'],
            STEP_ADJUST_FREQUENCY['4.16KHZ'],
            STEP_ADJUST_FREQUENCY['4.5KHZ'],
            STEP_ADJUST_FREQUENCY['5KHZ'],
            STEP_ADJUST_FREQUENCY['6.25KHZ'],
            STEP_ADJUST_FREQUENCY['7.5KHZ'],
            STEP_ADJUST_FREQUENCY['10KHZ'],
            STEP_ADJUST_FREQUENCY['12.5KHZ'],
            STEP_ADJUST_FREQUENCY['15KHZ'],
            STEP_ADJUST_FREQUENCY['20KHZ'],
            STEP_ADJUST_FREQUENCY['25KHZ'],
            STEP_ADJUST_FREQUENCY['50KHZ']
        ]
    },
    '500KHZ': {
        text: '500kHz',
        value: '500.00',
        step_adjust_frequency: [
            STEP_ADJUST_FREQUENCY['0HZ'],
            STEP_ADJUST_FREQUENCY['50HZ'],
            STEP_ADJUST_FREQUENCY['0.25KHZ'],
            STEP_ADJUST_FREQUENCY['0.5KHZ'],
            STEP_ADJUST_FREQUENCY['1KHZ'],
            STEP_ADJUST_FREQUENCY['2.5KHZ'],
            STEP_ADJUST_FREQUENCY['3.12KHZ'],
            STEP_ADJUST_FREQUENCY['3.75KHZ'],
            STEP_ADJUST_FREQUENCY['4.16KHZ'],
            STEP_ADJUST_FREQUENCY['4.5KHZ'],
            STEP_ADJUST_FREQUENCY['5KHZ'],
            STEP_ADJUST_FREQUENCY['6.25KHZ'],
            STEP_ADJUST_FREQUENCY['7.5KHZ'],
            STEP_ADJUST_FREQUENCY['10KHZ'],
            STEP_ADJUST_FREQUENCY['12.5KHZ'],
            STEP_ADJUST_FREQUENCY['15KHZ'],
            STEP_ADJUST_FREQUENCY['20KHZ'],
            STEP_ADJUST_FREQUENCY['25KHZ'],
            STEP_ADJUST_FREQUENCY['50KHZ'],
            STEP_ADJUST_FREQUENCY['250KHZ']
        ]
    }
}
