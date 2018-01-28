/** ****************************************************************************************************
 * File: index.js
 * Project: CRC32
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 10-Oct-2015
 *******************************************************************************************************/
'use strict';

const { extname } = require( 'path' );

class CRC32
{
    constructor( file, opts = {} )
    {
        this.TABLE = {
            '0': 0, '1': 1996959894, '2': -301047508, '3': -1727442502,
            '4': 124634137, '5': 1886057615, '6': -379345611, '7': -1637575261,
            '8': 249268274, '9': 2044508324, '10': -522852066, '11': -1747789432,
            '12': 162941995, '13': 2125561021, '14': -407360249, '15': -1866523247,
            '16': 498536548, '17': 1789927666, '18': -205950648, '19': -2067906082,
            '20': 450548861, '21': 1843258603, '22': -187386543, '23': -2083289657,
            '24': 325883990, '25': 1684777152, '26': -43845254, '27': -1973040660,
            '28': 335633487, '29': 1661365465, '30': -99664541, '31': -1928851979,
            '32': 997073096, '33': 1281953886, '34': -715111964, '35': -1570279054,
            '36': 1006888145, '37': 1258607687, '38': -770865667, '39': -1526024853,
            '40': 901097722, '41': 1119000684, '42': -608450090, '43': -1396901568,
            '44': 853044451, '45': 1172266101, '46': -589951537, '47': -1412350631,
            '48': 651767980, '49': 1373503546, '50': -925412992, '51': -1076862698,
            '52': 565507253, '53': 1454621731, '54': -809855591, '55': -1195530993,
            '56': 671266974, '57': 1594198024, '58': -972236366, '59': -1324619484,
            '60': 795835527, '61': 1483230225, '62': -1050600021, '63': -1234817731,
            '64': 1994146192, '65': 31158534, '66': -1731059524, '67': -271249366,
            '68': 1907459465, '69': 112637215, '70': -1614814043, '71': -390540237,
            '72': 2013776290, '73': 251722036, '74': -1777751922, '75': -519137256,
            '76': 2137656763, '77': 141376813, '78': -1855689577, '79': -429695999,
            '80': 1802195444, '81': 476864866, '82': -2056965928, '83': -228458418,
            '84': 1812370925, '85': 453092731, '86': -2113342271, '87': -183516073,
            '88': 1706088902, '89': 314042704, '90': -1950435094, '91': -54949764,
            '92': 1658658271, '93': 366619977, '94': -1932296973, '95': -69972891,
            '96': 1303535960, '97': 984961486, '98': -1547960204, '99': -725929758,
            '100': 1256170817, '101': 1037604311, '102': -1529756563, '103': -740887301,
            '104': 1131014506, '105': 879679996, '106': -1385723834, '107': -631195440,
            '108': 1141124467, '109': 855842277, '110': -1442165665, '111': -586318647,
            '112': 1342533948, '113': 654459306, '114': -1106571248, '115': -921952122,
            '116': 1466479909, '117': 544179635, '118': -1184443383, '119': -832445281,
            '120': 1591671054, '121': 702138776, '122': -1328506846, '123': -942167884,
            '124': 1504918807, '125': 783551873, '126': -1212326853, '127': -1061524307,
            '128': -306674912, '129': -1698712650, '130': 62317068, '131': 1957810842,
            '132': -355121351, '133': -1647151185, '134': 81470997, '135': 1943803523,
            '136': -480048366, '137': -1805370492, '138': 225274430, '139': 2053790376,
            '140': -468791541, '141': -1828061283, '142': 167816743, '143': 2097651377,
            '144': -267414716, '145': -2029476910, '146': 503444072, '147': 1762050814,
            '148': -144550051, '149': -2140837941, '150': 426522225, '151': 1852507879,
            '152': -19653770, '153': -1982649376, '154': 282753626, '155': 1742555852,
            '156': -105259153, '157': -1900089351, '158': 397917763, '159': 1622183637,
            '160': -690576408, '161': -1580100738, '162': 953729732, '163': 1340076626,
            '164': -776247311, '165': -1497606297, '166': 1068828381, '167': 1219638859,
            '168': -670225446, '169': -1358292148, '170': 906185462, '171': 1090812512,
            '172': -547295293, '173': -1469587627, '174': 829329135, '175': 1181335161,
            '176': -882789492, '177': -1134132454, '178': 628085408, '179': 1382605366,
            '180': -871598187, '181': -1156888829, '182': 570562233, '183': 1426400815,
            '184': -977650754, '185': -1296233688, '186': 733239954, '187': 1555261956,
            '188': -1026031705, '189': -1244606671, '190': 752459403, '191': 1541320221,
            '192': -1687895376, '193': -328994266, '194': 1969922972, '195': 40735498,
            '196': -1677130071, '197': -351390145, '198': 1913087877, '199': 83908371,
            '200': -1782625662, '201': -491226604, '202': 2075208622, '203': 213261112,
            '204': -1831694693, '205': -438977011, '206': 2094854071, '207': 198958881,
            '208': -2032938284, '209': -237706686, '210': 1759359992, '211': 534414190,
            '212': -2118248755, '213': -155638181, '214': 1873836001, '215': 414664567,
            '216': -2012718362, '217': -15766928, '218': 1711684554, '219': 285281116,
            '220': -1889165569, '221': -127750551, '222': 1634467795, '223': 376229701,
            '224': -1609899400, '225': -686959890, '226': 1308918612, '227': 956543938,
            '228': -1486412191, '229': -799009033, '230': 1231636301, '231': 1047427035,
            '232': -1362007478, '233': -640263460, '234': 1088359270, '235': 936918000,
            '236': -1447252397, '237': -558129467, '238': 1202900863, '239': 817233897,
            '240': -1111625188, '241': -893730166, '242': 1404277552, '243': 615818150,
            '244': -1160759803, '245': -841546093, '246': 1423857449, '247': 601450431,
            '248': -1285129682, '249': -1000256840, '250': 1567103746, '251': 711928724,
            '252': -1274298825, '253': -1022587231, '254': 1510334235, '255': 755167117
        };

        this.chunkSize  = opts.chunkSize || CRC32.WHOLE;
        this.outputType = opts.outputType || CRC32.HEX;
        this.isBuffer   = false;

        if( !file ) {
            throw new Error( 'Argument Error - `file` is a required parameter' );
        } else if( file === '' + file && ( extname( file ) && ( /(\/|^|.)\.[^\/\.]/g ).test( file ) ) ) {
            const { readFile } = require( 'fs' );
            this.file          = new Promise( ( res, rej ) => readFile( file, ( e, buf ) => e ? rej( e ) : res( buf ) ) );
        } else if( Buffer.isBuffer( file ) ) {
            this.isBuffer = true;
            this.file     = file;
        } else {
            throw new TypeError( 'TypeError - `file` must be typeof String or Buffer' );
        }

        return Promise.resolve( this.file )
            .then( d => this.calc_crc( d ) )
            .catch( console.error );
    }

    calc_crc( buffer )
    {
        this.chunkSize = this.chunkSize || buffer.length;

        const
            blockCount = ~~( ( buffer.length + this.chunkSize - 1 ) / this.chunkSize ),
            blocks     = [];

        for( let n = 0; n < blockCount; n++ ) {
            blocks.push( this.get_block( buffer, this.chunkSize, n ) );
        }

        return Promise.all( blocks )
            .then(
                d => d.map(
                    buf => {
                        const crc = this.crc32( buf );
                        return this.outputType === CRC32.INT ? crc : crc.toString( this.outputType );
                    }
                )
            )
            .catch( console.error );
    }

    get_block( buffer, size, index )
    {
        const chunk = ( index * size );
        return Promise.resolve( buffer.slice( chunk, chunk + size ) );
    }

    crc32( buf )
    {
        const L = buf.length - 7;

        let crc = -1, i = 0, x = 0;

        for( ; x < 8; x++ ) {
            crc = ( crc >>> 8 ) ^ this.TABLE[ ( crc ^ buf[ i++ ] ) & 0xFF ];
        }

        while( i < L + 7 ) {
            crc = ( crc >>> 8 ) ^ this.TABLE[ ( crc ^ buf[ i++ ] ) & 0xFF ];
        }

        return ~crc >>> 0;
    }
}

CRC32.WHOLE   = 0;
CRC32.B       = 1;
CRC32.KB      = 1024;
CRC32.MB      = 1048576;
CRC32.GB      = 1073741824;
CRC32.BINARY  = 2;
CRC32.OCTAL   = 8;
CRC32.DECIMAL = 10;
CRC32.HEX     = 16;
CRC32.INT     = 32;

module.exports = CRC32;
