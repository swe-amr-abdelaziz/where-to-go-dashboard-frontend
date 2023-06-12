const phoneCodes = [
  {
    country: 'Afghanistan',
    code: '+93',
    regex: '^\\+93\\d{9}$',
  },
  {
    country: 'Albania',
    code: '+355',
    regex: '^\\+355\\d{8}$',
  },
  {
    country: 'Algeria',
    code: '+213',
    regex: '^\\+213\\d{9}$',
  },
  {
    country: 'Andorra',
    code: '+376',
    regex: '^\\+376\\d{6}$',
  },
  {
    country: 'Angola',
    code: '+244',
    regex: '^\\+244\\d{9}$',
  },
  {
    country: 'Antigua and Barbuda',
    code: '+1-268',
    regex: '^\\+1-268\\d{7}$',
  },
  {
    country: 'Argentina',
    code: '+54',
    regex: '^\\+54\\d{10}$',
  },
  {
    country: 'Armenia',
    code: '+374',
    regex: '^\\+374\\d{8}$',
  },
  {
    country: 'Australia',
    code: '+61',
    regex: '^\\+61\\d{9}$',
  },
  {
    country: 'Austria',
    code: '+43',
    regex: '^\\+43\\d{10}$',
  },
  {
    country: 'Azerbaijan',
    code: '+994',
    regex: '^\\+994\\d{9}$',
  },
  {
    country: 'Bahamas',
    code: '+1-242',
    regex: '^\\+1-242\\d{7}$',
  },
  {
    country: 'Bahrain',
    code: '+973',
    regex: '^\\+973\\d{8}$',
  },
  {
    country: 'Bangladesh',
    code: '+880',
    regex: '^\\+880\\d{10}$',
  },
  {
    country: 'Barbados',
    code: '+1-246',
    regex: '^\\+1-246\\d{7}$',
  },
  {
    country: 'Belarus',
    code: '+375',
    regex: '^\\+375\\d{9}$',
  },
  {
    country: 'Belgium',
    code: '+32',
    regex: '^\\+32\\d{9}$',
  },
  {
    country: 'Belize',
    code: '+501',
    regex: '^\\+501\\d{7}$',
  },
  {
    country: 'Benin',
    code: '+229',
    regex: '^\\+229\\d{8}$',
  },
  {
    country: 'Bhutan',
    code: '+975',
    regex: '^\\+975\\d{8}$',
  },
  {
    country: 'Bolivia',
    code: '+591',
    regex: '^\\+591\\d{8}$',
  },
  {
    country: 'Bosnia and Herzegovina',
    code: '+387',
    regex: '^\\+387\\d{8}$',
  },
  {
    country: 'Botswana',
    code: '+267',
    regex: '^\\+267\\d{8}$',
  },
  {
    country: 'Brazil',
    code: '+55',
    regex: '^\\+55\\d{11}$',
  },
  {
    country: 'Brunei Darussalam',
    code: '+673',
    regex: '^\\+673\\d{7}$',
  },
  {
    country: 'Bulgaria',
    code: '+359',
    regex: '^\\+359\\d{8}$',
  },
  {
    country: 'Burkina Faso',
    code: '+226',
    regex: '^\\+226\\d{8}$',
  },
  {
    country: 'Burundi',
    code: '+257',
    regex: '^\\+257\\d{8}$',
  },
  {
    country: 'Cambodia',
    code: '+855',
    regex: '^\\+855\\d{8}$',
  },
  {
    country: 'Cameroon',
    code: '+237',
    regex: '^\\+237\\d{8}$',
  },
  {
    country: 'Canada',
    code: '+1',
    regex: '^\\+1\\d{10}$',
  },
  {
    country: 'Cape Verde',
    code: '+238',
    regex: '^\\+238\\d{7}$',
  },
  {
    country: 'Central African Republic',
    code: '+236',
    regex: '^\\+236\\d{8}$',
  },
  {
    country: 'Chad',
    code: '+235',
    regex: '^\\+235\\d{8}$',
  },
  {
    country: 'Chile',
    code: '+56',
    regex: '^\\+56\\d{9}$',
  },
  {
    country: 'China',
    code: '+86',
    regex: '^\\+86\\d{11}$',
  },
  {
    country: 'Colombia',
    code: '+57',
    regex: '^\\+57\\d{10}$',
  },
  {
    country: 'Comoros',
    code: '+269',
    regex: '^\\+269\\d{7}$',
  },
  {
    country: 'Congo',
    code: '+242',
    regex: '^\\+242\\d{8}$',
  },
  {
    country: 'Costa Rica',
    code: '+506',
    regex: '^\\+506\\d{8}$',
  },
  {
    country: 'Croatia',
    code: '+385',
    regex: '^\\+385\\d{9}$',
  },
  {
    country: 'Cuba',
    code: '+53',
    regex: '^\\+53\\d{8}$',
  },
  {
    country: 'Cyprus',
    code: '+357',
    regex: '^\\+357\\d{8}$',
  },
  {
    country: 'Czech Republic',
    code: '+420',
    regex: '^\\+420\\d{9}$',
  },
  {
    country: 'Denmark',
    code: '+45',
    regex: '^\\+45\\d{8}$',
  },
  {
    country: 'Djibouti',
    code: '+253',
    regex: '^\\+253\\d{6}$',
  },
  {
    country: 'Dominica',
    code: '+1-767',
    regex: '^\\+1-767\\d{7}$',
  },
  {
    country: 'Dominican Republic',
    code: '+1-809',
    regex: '^\\+1-809\\d{7}$',
  },
  {
    country: 'Ecuador',
    code: '+593',
    regex: '^\\+593\\d{9}$',
  },
  {
    country: 'Egypt',
    code: '+20',
    regex: '^\\+20\\d{10}$',
  },
  {
    country: 'El Salvador',
    code: '+503',
    regex: '^\\+503\\d{8}$',
  },
  {
    country: 'Equatorial Guinea',
    code: '+240',
    regex: '^\\+240\\d{8}$',
  },
  {
    country: 'Eritrea',
    code: '+291',
    regex: '^\\+291\\d{7}$',
  },
  {
    country: 'Estonia',
    code: '+372',
    regex: '^\\+372\\d{7}$',
  },
  {
    country: 'Eswatini',
    code: '+268',
    regex: '^\\+268\\d{8}$',
  },
  {
    country: 'Ethiopia',
    code: '+251',
    regex: '^\\+251\\d{9}$',
  },
  {
    country: 'Fiji',
    code: '+679',
    regex: '^\\+679\\d{7}$',
  },
  {
    country: 'Finland',
    code: '+358',
    regex: '^\\+358\\d{9}$',
  },
  {
    country: 'France',
    code: '+33',
    regex: '^\\+33\\d{9}$',
  },
  {
    country: 'Gabon',
    code: '+241',
    regex: '^\\+241\\d{8}$',
  },
  {
    country: 'Gambia',
    code: '+220',
    regex: '^\\+220\\d{7}$',
  },
  {
    country: 'Georgia',
    code: '+995',
    regex: '^\\+995\\d{8}$',
  },
  {
    country: 'Germany',
    code: '+49',
    regex: '^\\+49\\d{10}$',
  },
  {
    country: 'Ghana',
    code: '+233',
    regex: '^\\+233\\d{9}$',
  },
  {
    country: 'Greece',
    code: '+30',
    regex: '^\\+30\\d{10}$',
  },
  {
    country: 'Grenada',
    code: '+1-473',
    regex: '^\\+1-473\\d{7}$',
  },
  {
    country: 'Guatemala',
    code: '+502',
    regex: '^\\+502\\d{8}$',
  },
  {
    country: 'Guinea',
    code: '+224',
    regex: '^\\+224\\d{8}$',
  },
  {
    country: 'Guinea-Bissau',
    code: '+245',
    regex: '^\\+245\\d{7}$',
  },
  {
    country: 'Guyana',
    code: '+592',
    regex: '^\\+592\\d{7}$',
  },
  {
    country: 'Haiti',
    code: '+509',
    regex: '^\\+509\\d{8}$',
  },
  {
    country: 'Honduras',
    code: '+504',
    regex: '^\\+504\\d{8}$',
  },
  {
    country: 'Hungary',
    code: '+36',
    regex: '^\\+36\\d{9}$',
  },
  {
    country: 'Iceland',
    code: '+354',
    regex: '^\\+354\\d{7}$',
  },
  {
    country: 'India',
    code: '+91',
    regex: '^\\+91\\d{10}$',
  },
  {
    country: 'Indonesia',
    code: '+62',
    regex: '^\\+62\\d{10}$',
  },
  {
    country: 'Iran',
    code: '+98',
    regex: '^\\+98\\d{10}$',
  },
  {
    country: 'Iraq',
    code: '+964',
    regex: '^\\+964\\d{10}$',
  },
  {
    country: 'Ireland',
    code: '+353',
    regex: '^\\+353\\d{9}$',
  },
  {
    country: 'Israel',
    code: '+972',
    regex: '^\\+972\\d{9}$',
  },
  {
    country: 'Italy',
    code: '+39',
    regex: '^\\+39\\d{10}$',
  },
  {
    country: 'Jamaica',
    code: '+1-876',
    regex: '^\\+1-876\\d{7}$',
  },
  {
    country: 'Japan',
    code: '+81',
    regex: '^\\+81\\d{10}$',
  },
  {
    country: 'Jordan',
    code: '+962',
    regex: '^\\+962\\d{9}$',
  },
  {
    country: 'Kazakhstan',
    code: '+7',
    regex: '^\\+7\\d{10}$',
  },
  {
    country: 'Kenya',
    code: '+254',
    regex: '^\\+254\\d{9}$',
  },
  {
    country: 'Kiribati',
    code: '+686',
    regex: '^\\+686\\d{5}$',
  },
  {
    country: 'Kuwait',
    code: '+965',
    regex: '^\\+965\\d{8}$',
  },
  {
    country: 'Kyrgyzstan',
    code: '+996',
    regex: '^\\+996\\d{9}$',
  },
  {
    country: 'Laos',
    code: '+856',
    regex: '^\\+856\\d{9}$',
  },
  {
    country: 'Latvia',
    code: '+371',
    regex: '^\\+371\\d{8}$',
  },
  {
    country: 'Lebanon',
    code: '+961',
    regex: '^\\+961\\d{8}$',
  },
  {
    country: 'Lesotho',
    code: '+266',
    regex: '^\\+266\\d{8}$',
  },
  {
    country: 'Liberia',
    code: '+231',
    regex: '^\\+231\\d{7}$',
  },
  {
    country: 'Libya',
    code: '+218',
    regex: '^\\+218\\d{9}$',
  },
  {
    country: 'Liechtenstein',
    code: '+423',
    regex: '^\\+423\\d{7}$',
  },
  {
    country: 'Lithuania',
    code: '+370',
    regex: '^\\+370\\d{8}$',
  },
  {
    country: 'Luxembourg',
    code: '+352',
    regex: '^\\+352\\d{8}$',
  },
  {
    country: 'Madagascar',
    code: '+261',
    regex: '^\\+261\\d{9}$',
  },
  {
    country: 'Malawi',
    code: '+265',
    regex: '^\\+265\\d{8}$',
  },
  {
    country: 'Malaysia',
    code: '+60',
    regex: '^\\+60\\d{9}$',
  },
  {
    country: 'Maldives',
    code: '+960',
    regex: '^\\+960\\d{7}$',
  },
  {
    country: 'Mali',
    code: '+223',
    regex: '^\\+223\\d{8}$',
  },
  {
    country: 'Malta',
    code: '+356',
    regex: '^\\+356\\d{8}$',
  },
  {
    country: 'Marshall Islands',
    code: '+692',
    regex: '^\\+692\\d{7}$',
  },
  {
    country: 'Mauritania',
    code: '+222',
    regex: '^\\+222\\d{8}$',
  },
  {
    country: 'Mauritius',
    code: '+230',
    regex: '^\\+230\\d{7}$',
  },
  {
    country: 'Mexico',
    code: '+52',
    regex: '^\\+52\\d{10}$',
  },
  {
    country: 'Micronesia',
    code: '+691',
    regex: '^\\+691\\d{7}$',
  },
  {
    country: 'Moldova',
    code: '+373',
    regex: '^\\+373\\d{8}$',
  },
  {
    country: 'Monaco',
    code: '+377',
    regex: '^\\+377\\d{8}$',
  },
  {
    country: 'Mongolia',
    code: '+976',
    regex: '^\\+976\\d{8}$',
  },
  {
    country: 'Montenegro',
    code: '+382',
    regex: '^\\+382\\d{9}$',
  },
  {
    country: 'Morocco',
    code: '+212',
    regex: '^\\+212\\d{9}$',
  },
  {
    country: 'Mozambique',
    code: '+258',
    regex: '^\\+258\\d{9}$',
  },
  {
    country: 'Myanmar',
    code: '+95',
    regex: '^\\+95\\d{9}$',
  },
  {
    country: 'Namibia',
    code: '+264',
    regex: '^\\+264\\d{8}$',
  },
  {
    country: 'Nauru',
    code: '+674',
    regex: '^\\+674\\d{7}$',
  },
  {
    country: 'Nepal',
    code: '+977',
    regex: '^\\+977\\d{9}$',
  },
  {
    country: 'Netherlands',
    code: '+31',
    regex: '^\\+31\\d{9}$',
  },
  {
    country: 'New Zealand',
    code: '+64',
    regex: '^\\+64\\d{9}$',
  },
  {
    country: 'Nicaragua',
    code: '+505',
    regex: '^\\+505\\d{8}$',
  },
  {
    country: 'Niger',
    code: '+227',
    regex: '^\\+227\\d{8}$',
  },
  {
    country: 'Nigeria',
    code: '+234',
    regex: '^\\+234\\d{10}$',
  },
  {
    country: 'North Korea',
    code: '+850',
    regex: '^\\+850\\d{8}$',
  },
  {
    country: 'North Macedonia',
    code: '+389',
    regex: '^\\+389\\d{8}$',
  },
  {
    country: 'Norway',
    code: '+47',
    regex: '^\\+47\\d{8}$',
  },
  {
    country: 'Oman',
    code: '+968',
    regex: '^\\+968\\d{8}$',
  },
  {
    country: 'Pakistan',
    code: '+92',
    regex: '^\\+92\\d{10}$',
  },
  {
    country: 'Palau',
    code: '+680',
    regex: '^\\+680\\d{7}$',
  },
  {
    country: 'Panama',
    code: '+507',
    regex: '^\\+507\\d{7}$',
  },
  {
    country: 'Papua New Guinea',
    code: '+675',
    regex: '^\\+675\\d{9}$',
  },
  {
    country: 'Paraguay',
    code: '+595',
    regex: '^\\+595\\d{8}$',
  },
  {
    country: 'Peru',
    code: '+51',
    regex: '^\\+51\\d{9}$',
  },
  {
    country: 'Philippines',
    code: '+63',
    regex: '^\\+63\\d{10}$',
  },
  {
    country: 'Poland',
    code: '+48',
    regex: '^\\+48\\d{9}$',
  },
  {
    country: 'Portugal',
    code: '+351',
    regex: '^\\+351\\d{9}$',
  },
  {
    country: 'Qatar',
    code: '+974',
    regex: '^\\+974\\d{8}$',
  },
  {
    country: 'Romania',
    code: '+40',
    regex: '^\\+40\\d{9}$',
  },
  {
    country: 'Russia',
    code: '+7',
    regex: '^\\+7\\d{10}$',
  },
  {
    country: 'Rwanda',
    code: '+250',
    regex: '^\\+250\\d{9}$',
  },
  {
    country: 'Saint Kitts and Nevis',
    code: '+1-869',
    regex: '^\\+1-869\\d{7}$',
  },
  {
    country: 'Saint Lucia',
    code: '+1-758',
    regex: '^\\+1-758\\d{7}$',
  },
  {
    country: 'Saint Vincent and the Grenadines',
    code: '+1-784',
    regex: '^\\+1-784\\d{7}$',
  },
  {
    country: 'Samoa',
    code: '+685',
    regex: '^\\+685\\d{6}$',
  },
  {
    country: 'San Marino',
    code: '+378',
    regex: '^\\+378\\d{7}$',
  },
  {
    country: 'Sao Tome and Principe',
    code: '+239',
    regex: '^\\+239\\d{7}$',
  },
  {
    country: 'Saudi Arabia',
    code: '+966',
    regex: '^\\+966\\d{9}$',
  },
  {
    country: 'Senegal',
    code: '+221',
    regex: '^\\+221\\d{8}$',
  },
  {
    country: 'Serbia',
    code: '+381',
    regex: '^\\+381\\d{9}$',
  },
  {
    country: 'Seychelles',
    code: '+248',
    regex: '^\\+248\\d{6}$',
  },
  {
    country: 'Sierra Leone',
    code: '+232',
    regex: '^\\+232\\d{8}$',
  },
  {
    country: 'Singapore',
    code: '+65',
    regex: '^\\+65\\d{8}$',
  },
  {
    country: 'Slovakia',
    code: '+421',
    regex: '^\\+421\\d{9}$',
  },
  {
    country: 'Slovenia',
    code: '+386',
    regex: '^\\+386\\d{8}$',
  },
  {
    country: 'Solomon Islands',
    code: '+677',
    regex: '^\\+677\\d{7}$',
  },
  {
    country: 'Somalia',
    code: '+252',
    regex: '^\\+252\\d{8}$',
  },
  {
    country: 'South Africa',
    code: '+27',
    regex: '^\\+27\\d{9}$',
  },
  {
    country: 'South Korea',
    code: '+82',
    regex: '^\\+82\\d{10}$',
  },
  {
    country: 'South Sudan',
    code: '+211',
    regex: '^\\+211\\d{9}$',
  },
  {
    country: 'Spain',
    code: '+34',
    regex: '^\\+34\\d{9}$',
  },
  {
    country: 'Sri Lanka',
    code: '+94',
    regex: '^\\+94\\d{9}$',
  },
  {
    country: 'Sudan',
    code: '+249',
    regex: '^\\+249\\d{9}$',
  },
  {
    country: 'Suriname',
    code: '+597',
    regex: '^\\+597\\d{7}$',
  },
  {
    country: 'Sweden',
    code: '+46',
    regex: '^\\+46\\d{9}$',
  },
  {
    country: 'Switzerland',
    code: '+41',
    regex: '^\\+41\\d{9}$',
  },
  {
    country: 'Syria',
    code: '+963',
    regex: '^\\+963\\d{9}$',
  },
  {
    country: 'Tajikistan',
    code: '+992',
    regex: '^\\+992\\d{9}$',
  },
  {
    country: 'Tanzania',
    code: '+255',
    regex: '^\\+255\\d{9}$',
  },
  {
    country: 'Thailand',
    code: '+66',
    regex: '^\\+66\\d{9}$',
  },
  {
    country: 'Timor-Leste',
    code: '+670',
    regex: '^\\+670\\d{7}$',
  },
  {
    country: 'Togo',
    code: '+228',
    regex: '^\\+228\\d{8}$',
  },
  {
    country: 'Tonga',
    code: '+676',
    regex: '^\\+676\\d{7}$',
  },
  {
    country: 'Trinidad and Tobago',
    code: '+1-868',
    regex: '^\\+1-868\\d{7}$',
  },
  {
    country: 'Tunisia',
    code: '+216',
    regex: '^\\+216\\d{7}$',
  },
  {
    country: 'Turkey',
    code: '+90',
    regex: '^\\+90\\d{10}$',
  },
  {
    country: 'Turkmenistan',
    code: '+993',
    regex: '^\\+993\\d{8}$',
  },
  {
    country: 'Tuvalu',
    code: '+688',
    regex: '^\\+688\\d{5}$',
  },
  {
    country: 'Uganda',
    code: '+256',
    regex: '^\\+256\\d{9}$',
  },
  {
    country: 'Ukraine',
    code: '+380',
    regex: '^\\+380\\d{9}$',
  },
  {
    country: 'United Arab Emirates',
    code: '+971',
    regex: '^\\+971\\d{9}$',
  },
  {
    country: 'United Kingdom',
    code: '+44',
    regex: '^\\+44\\d{10}$',
  },
  {
    country: 'United States',
    code: '+1',
    regex: '^\\+1\\d{10}$',
  },
  {
    country: 'Uruguay',
    code: '+598',
    regex: '^\\+598\\d{8}$',
  },
  {
    country: 'Uzbekistan',
    code: '+998',
    regex: '^\\+998\\d{9}$',
  },
  {
    country: 'Vanuatu',
    code: '+678',
    regex: '^\\+678\\d{7}$',
  },
  {
    country: 'Vatican City',
    code: '+379',
    regex: '^\\+379\\d{7}$',
  },
  {
    country: 'Venezuela',
    code: '+58',
    regex: '^\\+58\\d{10}$',
  },
  {
    country: 'Vietnam',
    code: '+84',
    regex: '^\\+84\\d{10}$',
  },
  {
    country: 'Yemen',
    code: '+967',
    regex: '^\\+967\\d{9}$',
  },
  {
    country: 'Zambia',
    code: '+260',
    regex: '^\\+260\\d{9}$',
  },
  {
    country: 'Zimbabwe',
    code: '+263',
    regex: '^\\+263\\d{9}$',
  },
]

export default phoneCodes
