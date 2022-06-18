import React from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

import { decode as base64_decode, encode as base64_encode } from "base-64";

import WebCamCapture from "../components/WebCamCapture";
import UploadImage from "../components/UploadImage";
import Basic from "../components/Dropzone";

import { api } from "../utils/Api";
import uuid from "react-uuid";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import { inputAdornmentClasses } from "@mui/material";

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

const poke_name_convertor = {
  Bulbasaur: "이상해씨",
  Ivysaur: "이상해풀",
  Venusaur: "이상해꽃",
  Charmander: "파이리",
  Charmeleon: "리자드",
  Charizard: "리자몽",
  Squirtle: "꼬부기",
  Wartortle: "어니부기",
  Blastoise: "거북왕",
  Caterpie: "캐터피",
  Metapod: "단데기",
  Butterfree: "버터플",
  Weedle: "뿔충이",
  Kakuna: "딱충이",
  Beedrill: "독침붕",
  Pidgey: "구구",
  Pidgeotto: "피죤",
  Pidgeot: "피죤투",
  Rattata: "꼬렛",
  Raticate: "레트라",
  Spearow: "깨비참",
  Fearow: "깨비드릴조",
  Ekans: "아보",
  Arbok: "아보크",
  Pikachu: "피카츄",
  Raichu: "라이츄",
  Sandshrew: "모래두지",
  Sandslash: "고지",
  "Nidoran♀": "니드런♀",
  Nidorina: "니드리나",
  Nidoqueen: "니드퀸",
  "Nidoran♂": "니드런♂",
  Nidorino: "니드리노",
  Nidoking: "니드킹",
  Clefairy: "삐삐",
  Clefable: "픽시",
  Vulpix: "식스테일",
  Ninetales: "나인테일",
  Jigglypuff: "푸린",
  Wigglytuff: "푸크린",
  Zubat: "주뱃",
  Golbat: "골뱃",
  Oddish: "뚜벅쵸",
  Gloom: "냄새꼬",
  Vileplume: "라플레시아",
  Paras: "파라스",
  Parasect: "파라섹트",
  Venonat: "콘팡",
  Venomoth: "도나리",
  Diglett: "디그다",
  Dugtrio: "닥트리오",
  Meowth: "나옹",
  Persian: "페르시온",
  Psyduck: "고라파덕",
  Golduck: "골덕",
  Mankey: "망키",
  Primeape: "성원숭",
  Growlithe: "가디",
  Arcanine: "윈디",
  Poliwag: "발챙이",
  Poliwhirl: "슈륙챙이",
  Poliwrath: "강챙이",
  Abra: "캐이시",
  Kadabra: "윤겔라",
  Alakazam: "후딘",
  Machop: "알통몬",
  Machoke: "근육몬",
  Machamp: "괴력몬",
  Bellsprout: "모다피",
  Weepinbell: "우츠동",
  Victreebel: "우츠보트",
  Tentacool: "왕눈해",
  Tentacruel: "독파리",
  Geodude: "꼬마돌",
  Graveler: "데구리",
  Golem: "딱구리",
  Ponyta: "포니타",
  Rapidash: "날쌩마",
  Slowpoke: "야돈",
  Slowbro: "야도란",
  Magnemite: "코일",
  Magneton: "레어코일",
  "Farfetch'd": "파오리",
  Doduo: "두두",
  Dodrio: "두트리오",
  Seel: "쥬쥬",
  Dewgong: "쥬레곤",
  Grimer: "질퍽이",
  Muk: "질뻐기",
  Shellder: "셀러",
  Cloyster: "파르셀",
  Gastly: "고오스",
  Haunter: "고우스트",
  Gengar: "팬텀",
  Onix: "롱스톤",
  Drowzee: "슬리프",
  Hypno: "슬리퍼",
  Krabby: "크랩",
  Kingler: "킹크랩",
  Voltorb: "찌리리공",
  Electrode: "붐볼",
  Exeggcute: "아라리",
  Exeggutor: "나시",
  Cubone: "탕구리",
  Marowak: "텅구리",
  Hitmonlee: "시라소몬",
  Hitmonchan: "홍수몬",
  Lickitung: "내루미",
  Koffing: "또가스",
  Weezing: "또도가스",
  Rhyhorn: "뿔카노",
  Rhydon: "코뿌리",
  Chansey: "럭키",
  Tangela: "덩쿠리",
  Kangaskhan: "캥카",
  Horsea: "쏘드라",
  Seadra: "시드라",
  Goldeen: "콘치",
  Seaking: "왕콘치",
  Staryu: "별가사리",
  Starmie: "아쿠스타",
  "Mr.": "마임맨",
  Scyther: "스라크",
  Jynx: "루주라",
  Electabuzz: "에레브",
  Magmar: "마그마",
  Pinsir: "쁘사이저",
  Tauros: "켄타로스",
  Magikarp: "잉어킹",
  Gyarados: "갸라도스",
  Lapras: "라프라스",
  Ditto: "메타몽",
  Eevee: "이브이",
  Vaporeon: "샤미드",
  Jolteon: "쥬피썬더",
  Flareon: "부스터",
  Porygon: "폴리곤",
  Omanyte: "암나이트",
  Omastar: "암스타",
  Kabuto: "투구",
  Kabutops: "투구푸스",
  Aerodactyl: "프테라",
  Snorlax: "잠만보",
  Articuno: "프리져",
  Zapdos: "썬더",
  Moltres: "파이어",
  Dratini: "미뇽",
  Dragonair: "신뇽",
  Dragonite: "망나뇽",
  Mewtwo: "뮤츠",
  Mew: "뮤",
  Chikorita: "치코리타",
  Bayleef: "베이리프",
  Meganium: "메가니움",
  Cyndaquil: "브케인",
  Quilava: "마그케인",
  Typhlosion: "블레이범",
  Totodile: "리아코",
  Croconaw: "엘리게이",
  Feraligatr: "장크로다일",
  Sentret: "꼬리선",
  Furret: "다꼬리",
  Hoothoot: "부우부",
  Noctowl: "야부엉",
  Ledyba: "레디바",
  Ledian: "레디안",
  Spinarak: "페이검",
  Ariados: "아리아도스",
  Crobat: "크로뱃",
  Chinchou: "초라기",
  Lanturn: "랜턴",
  Pichu: "피츄",
  Cleffa: "삐",
  Igglybuff: "푸푸린",
  Togepi: "토게피",
  Togetic: "토게틱",
  Natu: "네이티",
  Xatu: "네이티오",
  Mareep: "메리프",
  Flaaffy: "보송송",
  Ampharos: "전룡",
  Bellossom: "아르코",
  Marill: "마릴",
  Azumarill: "마릴리",
  Sudowoodo: "꼬지모",
  Politoed: "왕구리",
  Hoppip: "통통코",
  Skiploom: "두코",
  Jumpluff: "솜솜코",
  Aipom: "에이팜",
  Sunkern: "해너츠",
  Sunflora: "해루미",
  Yanma: "왕자리",
  Wooper: "우파",
  Quagsire: "누오",
  Espeon: "에브이",
  Umbreon: "블래키",
  Murkrow: "니로우",
  Slowking: "야도킹",
  Misdreavus: "무우마",
  Unown: "안농",
  Wobbuffet: "마자용",
  Girafarig: "키링키",
  Pineco: "피콘",
  Forretress: "쏘콘",
  Dunsparce: "노고치",
  Gligar: "글라이거",
  Steelix: "강철톤",
  Snubbull: "블루",
  Granbull: "그랑블루",
  Qwilfish: "침바루",
  Scizor: "핫삼",
  Shuckle: "단단지",
  Heracross: "헤라크로스",
  Sneasel: "포푸니",
  Teddiursa: "깜지곰",
  Ursaring: "링곰",
  Slugma: "마그마그",
  Magcargo: "마그카르고",
  Swinub: "꾸꾸리",
  Piloswine: "메꾸리",
  Corsola: "코산호",
  Remoraid: "총어",
  Octillery: "대포무노",
  Delibird: "딜리버드",
  Mantine: "만타인",
  Skarmory: "무장조",
  Houndour: "델빌",
  Houndoom: "헬가",
  Kingdra: "킹드라",
  Phanpy: "코코리",
  Donphan: "코리갑",
  Porygon2: "폴리곤2",
  Stantler: "노라키",
  Smeargle: "루브도",
  Tyrogue: "배루키",
  Hitmontop: "카포에라",
  Smoochum: "뽀뽀라",
  Elekid: "에레키드",
  Magby: "마그비",
  Miltank: "밀탱크",
  Blissey: "해피너스",
  Raikou: "라이코",
  Entei: "앤테이",
  Suicune: "스이쿤",
  Larvitar: "애버라스",
  Pupitar: "데기라스",
  Tyranitar: "마기라스",
  Lugia: "루기아",
  "Ho-Oh": "칠색조",
  Celebi: "세레비",
  Treecko: "나무지기",
  Grovyle: "나무돌이",
  Sceptile: "나무킹",
  Torchic: "아차모",
  Combusken: "영치코",
  Blaziken: "번치코",
  Mudkip: "물짱이",
  Marshtomp: "늪짱이",
  Swampert: "대짱이",
  Poochyena: "포챠나",
  Mightyena: "그라에나",
  Zigzagoon: "지그제구리",
  Linoone: "직구리",
  Wurmple: "개무소",
  Silcoon: "실쿤",
  Beautifly: "뷰티플라이",
  Cascoon: "카스쿤",
  Dustox: "독케일",
  Lotad: "연꽃몬",
  Lombre: "로토스",
  Ludicolo: "로파파",
  Seedot: "도토링",
  Nuzleaf: "잎새코",
  Shiftry: "다탱구",
  Taillow: "테일로",
  Swellow: "스왈로",
  Wingull: "갈모매",
  Pelipper: "패리퍼",
  Ralts: "랄토스",
  Kirlia: "킬리아",
  Gardevoir: "가디안",
  Surskit: "비구술",
  Masquerain: "비나방",
  Shroomish: "버섯꼬",
  Breloom: "버섯모",
  Slakoth: "게을로",
  Vigoroth: "발바로",
  Slaking: "게을킹",
  Nincada: "토중몬",
  Ninjask: "아이스크",
  Shedinja: "껍질몬",
  Whismur: "소곤룡",
  Loudred: "노공룡",
  Exploud: "폭음룡",
  Makuhita: "마크탕",
  Hariyama: "하리뭉",
  Azurill: "루리리",
  Nosepass: "코코파스",
  Skitty: "에나비",
  Delcatty: "델케티",
  Sableye: "깜까미",
  Mawile: "입치트",
  Aron: "가보리",
  Lairon: "갱도라",
  Aggron: "보스로라",
  Meditite: "요가랑",
  Medicham: "요가램",
  Electrike: "썬더라이",
  Manectric: "썬더볼트",
  Plusle: "플러시",
  Minun: "마이농",
  Volbeat: "볼비트",
  Illumise: "네오비트",
  Roselia: "로젤리아",
  Gulpin: "꼴깍몬",
  Swalot: "꿀꺽몬",
  Carvanha: "샤프니아",
  Sharpedo: "샤크니아",
  Wailmer: "고래왕자",
  Wailord: "고래왕",
  Numel: "둔타",
  Camerupt: "폭타",
  Torkoal: "코터스",
  Spoink: "피그점프",
  Grumpig: "피그킹",
  Spinda: "얼루기",
  Trapinch: "톱치",
  Vibrava: "비브라바",
  Flygon: "플라이곤",
  Cacnea: "선인왕",
  Cacturne: "밤선인",
  Swablu: "파비코",
  Altaria: "파비코리",
  Zangoose: "쟝고",
  Seviper: "세비퍼",
  Lunatone: "루나톤",
  Solrock: "솔록",
  Barboach: "미꾸리",
  Whiscash: "메깅",
  Corphish: "가재군",
  Crawdaunt: "가재장군",
  Baltoy: "오뚝군",
  Claydol: "점토도리",
  Lileep: "릴링",
  Cradily: "릴리요",
  Anorith: "아노딥스",
  Armaldo: "아말도",
  Feebas: "빈티나",
  Milotic: "밀로틱",
  Castform: "캐스퐁",
  Kecleon: "켈리몬",
  Shuppet: "어둠대신",
  Banette: "다크펫",
  Duskull: "해골몽",
  Dusclops: "미라몽",
  Tropius: "트로피우스",
  Chimecho: "치렁",
  Absol: "앱솔",
  Wynaut: "마자",
  Snorunt: "눈꼬마",
  Glalie: "얼음귀신",
  Spheal: "대굴레오",
  Sealeo: "씨레오",
  Walrein: "씨카이저",
  Clamperl: "진주몽",
  Huntail: "헌테일",
  Gorebyss: "분홍장이",
  Relicanth: "시라칸",
  Luvdisc: "사랑동이",
  Bagon: "아공이",
  Shelgon: "쉘곤",
  Salamence: "보만다",
  Beldum: "메탕",
  Metang: "메탕구",
  Metagross: "메타그로스",
  Regirock: "레지락",
  Regice: "레지아이스",
  Registeel: "레지스틸",
  Latias: "라티아스",
  Latios: "라티오스",
  Kyogre: "가이오가",
  Groudon: "그란돈",
  Rayquaza: "레쿠쟈",
  Jirachi: "지라치",
  Deoxys: "테오키스",
  Turtwig: "모부기",
  Grotle: "수풀부기",
  Torterra: "토대부기",
  Chimchar: "불꽃숭이",
  Monferno: "파이숭이",
  Infernape: "초염몽",
  Piplup: "팽도리",
  Prinplup: "팽태자",
  Empoleon: "엠페르트",
  Starly: "찌르꼬",
  Staravia: "찌르버드",
  Staraptor: "찌르호크",
  Bidoof: "비버니",
  Bibarel: "비버통",
  Kricketot: "귀뚤뚜기",
  Kricketune: "귀뚤톡크",
  Shinx: "꼬링크",
  Luxio: "럭시오",
  Luxray: "렌트라",
  Budew: "꼬몽울",
  Roserade: "로즈레이드",
  Cranidos: "두개도스",
  Rampardos: "램펄드",
  Shieldon: "방패톱스",
  Bastiodon: "바리톱스",
  Burmy: "도롱충이",
  Wormadam: "도롱마담",
  Mothim: "나메일",
  Combee: "세꿀버리",
  Vespiquen: "비퀸",
  Pachirisu: "파치리스",
  Buizel: "브이젤",
  Floatzel: "플로젤",
  Cherubi: "체리버",
  Cherrim: "체리꼬",
  Shellos: "깝질무",
  Gastrodon: "트리토돈",
  Ambipom: "겟핸보숭",
  Drifloon: "흔들풍손",
  Drifblim: "둥실라이드",
  Buneary: "이어롤",
  Lopunny: "이어롭",
  Mismagius: "무우마직",
  Honchkrow: "돈크로우",
  Glameow: "나옹마",
  Purugly: "몬냥이",
  Chingling: "랑딸랑",
  Stunky: "스컹뿡",
  Skuntank: "스컹탱크",
  Bronzor: "동미러",
  Bronzong: "동탁군",
  Bonsly: "꼬지지",
  Mime: "흉내내",
  Happiny: "핑복",
  Chatot: "페라페",
  Spiritomb: "화강돌",
  Gible: "딥상어동",
  Gabite: "한바이트",
  Garchomp: "한카리아스",
  Munchlax: "먹고자",
  Riolu: "리오르",
  Lucario: "루카리오",
  Hippopotas: "히포포타스",
  Hippowdon: "하마돈",
  Skorupi: "스콜피",
  Drapion: "드래피온",
  Croagunk: "삐딱구리",
  Toxicroak: "독개굴",
  Carnivine: "무스틈니",
  Finneon: "형광어",
  Lumineon: "네오라이트",
  Mantyke: "타만타",
  Snover: "눈쓰개",
  Abomasnow: "눈설왕",
  Weavile: "포푸니라",
  Magnezone: "자포코일",
  Lickilicky: "내룸벨트",
  Rhyperior: "거대코뿌리",
  Tangrowth: "덩쿠림보",
  Electivire: "에레키블",
  Magmortar: "마그마번",
  Togekiss: "토게키스",
  Yanmega: "메가자리",
  Leafeon: "리피아",
  Glaceon: "글레이시아",
  Gliscor: "글라이온",
  Mamoswine: "맘모꾸리",
  "Porygon-Z": "폴리곤Z",
  Gallade: "엘레이드",
  Probopass: "대코파스",
  Dusknoir: "야느와르몽",
  Froslass: "눈여아",
  Rotom: "로토무",
  Uxie: "유크시",
  Mesprit: "엠라이트",
  Azelf: "아그놈",
  Dialga: "디아루가",
  Palkia: "펄기아",
  Heatran: "히드런",
  Regigigas: "레지기가스",
  Giratina: "기라티나",
  Cresselia: "크레세리아",
  Phione: "피오네",
  Manaphy: "마나피",
  Darkrai: "다크라이",
  Shaymin: "쉐이미",
  Arceus: "아르세우스",
  Victini: "비크티니",
  Snivy: "주리비얀",
  Servine: "샤비",
  Serperior: "샤로다",
  Tepig: "뚜꾸리",
  Pignite: "챠오꿀",
  Emboar: "염무왕",
  Oshawott: "수댕이",
  Dewott: "쌍검자비",
  Samurott: "대검귀",
  Patrat: "보르쥐",
  Watchog: "보르그",
  Lillipup: "요테리",
  Herdier: "하데리어",
  Stoutland: "바랜드",
  Purrloin: "쌔비냥",
  Liepard: "레파르다스",
  Pansage: "야나프",
  Simisage: "야나키",
  Pansear: "바오프",
  Simisear: "바오키",
  Panpour: "앗차프",
  Simipour: "앗차키",
  Munna: "몽나",
  Musharna: "몽얌나",
  Pidove: "콩둘기",
  Tranquill: "유토브",
  Unfezant: "켄호로우",
  Blitzle: "줄뮤마",
  Zebstrika: "제브라이카",
  Roggenrola: "단굴",
  Boldore: "암트르",
  Gigalith: "기가이어스",
  Woobat: "또르박쥐",
  Swoobat: "맘박쥐",
  Drilbur: "두더류",
  Excadrill: "몰드류",
  Audino: "다부니",
  Timburr: "으랏차",
  Gurdurr: "토쇠골",
  Conkeldurr: "노보청",
  Tympole: "동챙이",
  Palpitoad: "두까비",
  Seismitoad: "두빅굴",
  Throh: "던지미",
  Sawk: "타격귀",
  Sewaddle: "두르보",
  Swadloon: "두르쿤",
  Leavanny: "모아머",
  Venipede: "마디네",
  Whirlipede: "휠구",
  Scolipede: "펜드라",
  Cottonee: "소미안",
  Whimsicott: "엘풍",
  Petilil: "치릴리",
  Lilligant: "드레디어",
  Basculin: "배쓰나이",
  Sandile: "깜눈크",
  Krokorok: "악비르",
  Krookodile: "악비아르",
  Darumaka: "달막화",
  Darmanitan: "불비달마",
  Maractus: "마라카치",
  Dwebble: "돌살이",
  Crustle: "암팰리스",
  Scraggy: "곤율랭",
  Scrafty: "곤율거니",
  Sigilyph: "심보러",
  Yamask: "데스마스",
  Cofagrigus: "데스니칸",
  Tirtouga: "프로토가",
  Carracosta: "늑골라",
  Archen: "아켄",
  Archeops: "아케오스",
  Trubbish: "깨봉이",
  Garbodor: "더스트나",
  Zorua: "조로아",
  Zoroark: "조로아크",
  Minccino: "치라미",
  Cinccino: "치라치노",
  Gothita: "고디탱",
  Gothorita: "고디보미",
  Gothitelle: "고디모아젤",
  Solosis: "유니란",
  Duosion: "듀란",
  Reuniclus: "란쿨루스",
  Ducklett: "꼬지보리",
  Swanna: "스완나",
  Vanillite: "바닐프티",
  Vanillish: "바닐리치",
  Vanilluxe: "배바닐라",
  Deerling: "사철록",
  Sawsbuck: "바라철록",
  Emolga: "에몽가",
  Karrablast: "딱정곤",
  Escavalier: "슈바르고",
  Foongus: "깜놀버슬",
  Amoonguss: "뽀록나",
  Frillish: "탱그릴",
  Jellicent: "탱탱겔",
  Alomomola: "맘복치",
  Joltik: "파쪼옥",
  Galvantula: "전툴라",
  Ferroseed: "철시드",
  Ferrothorn: "너트령",
  Klink: "기어르",
  Klang: "기기어르",
  Klinklang: "기기기어르",
  Tynamo: "저리어",
  Eelektrik: "저리릴",
  Eelektross: "저리더프",
  Elgyem: "리그레",
  Beheeyem: "벰크",
  Litwick: "불켜미",
  Lampent: "램프라",
  Chandelure: "샹델라",
  Axew: "터검니",
  Fraxure: "액슨도",
  Haxorus: "액스라이즈",
  Cubchoo: "코고미",
  Beartic: "툰베어",
  Cryogonal: "프리지오",
  Shelmet: "쪼마리",
  Accelgor: "어지리더",
  Stunfisk: "메더",
  Mienfoo: "비조푸",
  Mienshao: "비조도",
  Druddigon: "크리만",
  Golett: "골비람",
  Golurk: "골루그",
  Pawniard: "자망칼",
  Bisharp: "절각참",
  Bouffalant: "버프론",
  Rufflet: "수리둥보",
  Braviary: "워글",
  Vullaby: "벌차이",
  Mandibuzz: "버랜지나",
  Heatmor: "앤티골",
  Durant: "아이앤트",
  Deino: "모노두",
  Zweilous: "디헤드",
  Hydreigon: "삼삼드래",
  Larvesta: "활화르바",
  Volcarona: "불카모스",
  Cobalion: "코바르온",
  Terrakion: "테라키온",
  Virizion: "비리디온",
  Tornadus: "토네로스",
  Thundurus: "볼트로스",
  Reshiram: "레시라무",
  Zekrom: "제크로무",
  Landorus: "랜드로스",
  Kyurem: "큐레무",
  Keldeo: "케르디오",
  Meloetta: "메로엣타",
  Genesect: "게노세크트",
  Chespin: "도치마론",
  Quilladin: "도치보구",
  Chesnaught: "브리가론",
  Fennekin: "푸호꼬",
  Braixen: "테르나",
  Delphox: "마폭시",
  Froakie: "개구마르",
  Frogadier: "개굴반장",
  Greninja: "개굴닌자",
  Bunnelby: "파르빗",
  Diggersby: "파르토",
  Fletchling: "화살꼬빈",
  Fletchinder: "불화살빈",
  Talonflame: "파이어로",
  Scatterbug: "분이벌레",
  Spewpa: "분떠도리",
  Vivillon: "비비용",
  Litleo: "레오꼬",
  Pyroar: "화염레오",
  Flabébé: "플라베베",
  Floette: "플라엣테",
  Florges: "플라제스",
  Skiddo: "메이클",
  Gogoat: "고고트",
  Pancham: "판짱",
  Pangoro: "부란다",
  Furfrou: "트리미앙",
  Espurr: "냐스퍼",
  Meowstic: "냐오닉스",
  Honedge: "단칼빙",
  Doublade: "쌍검킬",
  Aegislash: "킬가르도",
  Spritzee: "슈쁘",
  Aromatisse: "프레프티르",
  Swirlix: "나룸퍼프",
  Slurpuff: "나루림",
  Inkay: "오케이징",
  Malamar: "칼라마네로",
  Binacle: "거북손손",
  Barbaracle: "거북손데스",
  Skrelp: "수레기",
  Dragalge: "드래캄",
  Clauncher: "완철포",
  Clawitzer: "블로스터",
  Helioptile: "목도리키텔",
  Heliolisk: "일레도리자드",
  Tyrunt: "티고라스",
  Tyrantrum: "견고라스",
  Amaura: "아마루스",
  Aurorus: "아마루르가",
  Sylveon: "님피아",
  Hawlucha: "루차불",
  Dedenne: "데덴네",
  Carbink: "멜리시",
  Goomy: "미끄메라",
  Sliggoo: "미끄네일",
  Goodra: "미끄래곤",
  Klefki: "클레피",
  Phantump: "나목령",
  Trevenant: "대로트",
  Pumpkaboo: "호바귀",
  Gourgeist: "펌킨인",
  Bergmite: "꽁어름",
  Avalugg: "크레베이스",
  Noibat: "음뱃",
  Noivern: "음번",
  Xerneas: "제르네아스",
  Yveltal: "이벨타르",
  Zygarde: "지가르데",
  Diancie: "디안시",
  Hoopa: "후파",
  Volcanion: "볼케니온",
  Rowlet: "나몰빼미",
  Dartrix: "빼미스로우",
  Decidueye: "모크나이퍼",
  Litten: "냐오불",
  Torracat: "냐오히트",
  Incineroar: "어흥염",
  Popplio: "누리공",
  Brionne: "키요공",
  Primarina: "누리레느",
  Pikipek: "콕코구리",
  Trumbeak: "크라파",
  Toucannon: "왕큰부리",
  Yungoos: "영구스",
  Gumshoos: "형사구스",
  Grubbin: "턱지충이",
  Charjabug: "전지충이",
  Vikavolt: "투구뿌논",
  Crabrawler: "오기지게",
  Crabominable: "모단단게",
  Oricorio: "춤추새",
  Cutiefly: "에블리",
  Ribombee: "에리본",
  Rockruff: "암멍이",
  Lycanroc: "루가루암",
  Wishiwashi: "약어리",
  Mareanie: "시마사리",
  Toxapex: "더시마사리",
  Mudbray: "머드나기",
  Mudsdale: "만마드",
  Dewpider: "물거미",
  Araquanid: "깨비물거미",
  Fomantis: "짜랑랑",
  Lurantis: "라란티스",
  Morelull: "자마슈",
  Shiinotic: "마셰이드",
  Salandit: "야도뇽",
  Salazzle: "염뉴트",
  Stufful: "포곰곰",
  Bewear: "이븐곰",
  Bounsweet: "달콤아",
  Steenee: "달무리나",
  Tsareena: "달코퀸",
  Comfey: "큐아링",
  Oranguru: "하랑우탄",
  Passimian: "내던숭이",
  Wimpod: "꼬시레",
  Golisopod: "갑주무사",
  Sandygast: "모래꿍",
  Palossand: "모래성이당",
  Pyukumuku: "해무기",
  "Type:": "타입:널",
  Silvally: "실버디",
  Minior: "메테노",
  Komala: "자말라",
  Turtonator: "폭거북스",
  Togedemaru: "토게데마루",
  Mimikyu: "따라큐",
  Bruxish: "치갈기",
  Drampa: "할비롱",
  Dhelmise: "타타륜",
  "Jangmo-o": "짜랑꼬",
  "Hakamo-o": "짜랑고우",
  "Kommo-o": "짜랑고우거",
  Tapu: "카푸꼬꼬꼭",
  Tapu: "카푸나비나",
  Tapu: "카푸브루루",
  Tapu: "카푸느지느",
  Cosmog: "코스모그",
  Cosmoem: "코스모움",
  Solgaleo: "솔가레오",
  Lunala: "루나아라",
  Nihilego: "텅비드",
  Buzzwole: "매시붕",
  Pheromosa: "페로코체",
  Xurkitree: "전수목",
  Celesteela: "철화구야",
  Kartana: "종이신도",
  Guzzlord: "악식킹",
  Necrozma: "네크로즈마",
  Magearna: "마기아나",
  Marshadow: "마샤도",
  Poipole: "베베놈",
  Naganadel: "아고용",
  Stakataka: "차곡차곡",
  Blacephalon: "두파팡",
  Zeraora: "제라오라",
  Meltan: "멜탄",
  Melmetal: "멜메탈",
  Grookey: "흥나숭",
  Thwackey: "채키몽",
  Rillaboom: "고릴타",
  Scorbunny: "염버니",
  Raboot: "래비풋",
  Cinderace: "에이스번",
  Sobble: "울머기",
  Drizzile: "누겔레온",
  Inteleon: "인텔리레온",
  Skwovet: "탐리스",
  Greedent: "요씽리스",
  Rookiedee: "파라꼬",
  Corvisquire: "파크로우",
  Corviknight: "아머까오",
  Blipbug: "두루지벌레",
  Dottler: "레돔벌레",
  Orbeetle: "이올브",
  Nickit: "훔처우",
  Thievul: "폭슬라이",
  Gossifleur: "꼬모카",
  Eldegoss: "백솜모카",
  Wooloo: "우르",
  Dubwool: "배우르",
  Chewtle: "깨물부기",
  Drednaw: "갈가부기",
  Yamper: "멍파치",
  Boltund: "펄스멍",
  Rolycoly: "탄동",
  Carkol: "탄차곤",
  Coalossal: "석탄산",
  Applin: "과사삭벌레",
  Flapple: "애프룡",
  Appletun: "단지래플",
  Silicobra: "모래뱀",
  Sandaconda: "사다이사",
  Cramorant: "윽우지",
  Arrokuda: "찌로꼬치",
  Barraskewda: "꼬치조",
  Toxel: "일레즌",
  Toxtricity: "스트린더",
  Sizzlipede: "태우지네",
  Centiskorch: "다태우지네",
  Clobbopus: "때때무노",
  Grapploct: "케오퍼스",
  Sinistea: "데인차",
  Polteageist: "포트데스",
  Hatenna: "몸지브림",
  Hattrem: "손지브림",
  Hatterene: "브리무음",
  Impidimp: "메롱꿍",
  Morgrem: "쏘겨모",
  Grimmsnarl: "오롱털",
  Obstagoon: "가로막구리",
  Perrserker: "나이킹",
  Cursola: "산호르곤",
  "Sirfetch'd": "창파나이트",
  "Mr.": "마임꽁꽁",
  Runerigus: "데스판",
  Milcery: "마빌크",
  Alcremie: "마휘핑",
  Falinks: "대여르",
  Pincurchin: "찌르성게",
  Snom: "누니머기",
  Frosmoth: "모스노우",
  Stonjourner: "돌헨진",
  Eiscue: "빙큐보",
  Indeedee: "에써르",
  Morpeko: "모르페코",
  Cufant: "끼리동",
  Copperajah: "대왕끼리동",
  Dracozolt: "파치래곤",
  Arctozolt: "파치르돈",
  Dracovish: "어래곤",
  Arctovish: "어치르돈",
  Duraludon: "두랄루돈",
  Dreepy: "드라꼰",
  Drakloak: "드래런치",
  Dragapult: "드래펄트",
  Zacian: "자시안",
  Zamazenta: "자마젠타",
  Eternatus: "무한다이노",
  Kubfu: "치고마",
  Urshifu: "우라오스",
  Calyrex: "버드렉스",
  Zarude: "자루도",
  Regieleki: "레지에레키",
  Regidrago: "레지드래고",
};

export default class ImageAppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleUploadImageChange = this.handleUploadImageChange.bind(this);

    this.state = {
      image_data: null,
      loading: false,
      image_file: null,
      dis_url: null,
      name: null,
      toggle_state: "upload",
      selected: true,
    };
  }

  async get_classification() {
    let poke_image = this.state.image_file;
    await new Promise((r) => setTimeout(r, 20));
    let best_display = false;
    let res = await fetch("http://eec2-34-143-237-29.ngrok.io/", {
      method: "POST",
      body: JSON.stringify({ poke_image }),
    });
    // let res = await fetch("http://eec2-34-143-237-29.ngrok.io/", {
    //   method: "POST",
    //   body: JSON.stringify({ poke_image }),
    // });
    let json = await res.json();
    let poke_name = json["Name"];
    let korean_name = poke_name_convertor[poke_name];
    let backup_img = json["Default"];
    // let img_res = await fetch("https://bim801-server.herokuapp.com/", {
    //   method: "POST",
    //   body: JSON.stringify({ poke_name }),
    // });
    // let img_json = await img_res.json();
    let pokeapi_str =
      "https://pokeapi.co/api/v2/pokemon/" + poke_name.toLowerCase();
    let img_res = await fetch(pokeapi_str, {
      method: "GET",
    });
    let img_json = await img_res.json();
    let img_addr =
      img_json["sprites"]["other"]["official-artwork"]["front_default"];

    let ready = true;
    this.setState({ name: korean_name });
    this.setState({ dis_url: img_addr });
  }

  handleUploadImageChange(files) {
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (e) => {
      const test = e.target.result;
      this.setState({ image_file: test });
    };
    this.setState({ name: null });
    this.setState({ dis_url: null });
  }

  saveCapturedImage(data) {
    this.setState({ image_data: data });
  }

  saveUploadImage(data) {
    this.setState({ image_file: data });
  }

  turnCamera() {
    if (this.state.loading) {
      this.setState({ loading: false });
    } else {
      this.setState({ loading: true });
    }
  }

  saveImage() {
    api("imageprocessing/", {
      title: uuid(),
      image: JSON.stringify(this.state.image_file),
    });
    this.get_classification();
  }

  handleToggleChange = (e, value) => {
    if (value === "camera") {
      this.setState({
        toggle_state: value,
      });
      this.setState({
        selected: false,
      });
      this.setState({ image_file: null });
      this.setState({ name: null });
      this.setState({ dis_url: null });
    } else {
      this.setState({
        toggle_state: value,
      });
      this.setState({
        selected: true,
      });
      this.setState({ image_data: null });
      this.setState({ loading: false });
      this.setState({ name: null });
      this.setState({ dis_url: null });
    }
  };

  setSelected(data) {
    this.setState({
      selected: false,
    });
  }

  render() {
    const tempStyle = {
      boder: "'1px dashed black'",
      background: "red",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    };
    const theme = createTheme();

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <img
                src="/pocketmon_logo.svg"
                alt=""
                width="100%"
                height="100%"
              />
            </Grid>
            <Grid item xs={12}>
              <ToggleButtonGroup
                onChange={(e, value) => this.handleToggleChange("date", value)}
                name="date"
                id="date-select"
                exclusive={true}
                size="large"
                fullWidth={true}
              >
                <ToggleButton value="upload" selected={this.state.selected}>
                  사진 업로드
                </ToggleButton>
                <ToggleButton value="camera" selected={!this.state.selected}>
                  카메라 촬영
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
            {this.state.toggle_state === "upload" && (
              <Grid item xs={12}>
                <Card>
                  <Basic
                    onImageChange={(data) => this.handleUploadImageChange(data)}
                  />
                </Card>
                {this.state.image_file && !this.state.loading && (
                  <Card align="center">
                    <CardHeader
                      title={"업로드한 이미지"}
                      align="center"
                      style={tempStyle}
                    >
                      {" "}
                    </CardHeader>
                    <img
                      src={this.state.image_file}
                      alt=""
                      width="224"
                      height="224"
                      align="center"
                    />
                    <Stack
                      sx={{ mt: 1, mb: 1 }}
                      direction="row"
                      spacing={2}
                      justifyContent="center"
                    >
                      <Button
                        variant="contained"
                        align="left"
                        color="primary"
                        onClick={() => this.saveImage()}
                      >
                        닮은 포켓몬 찾기!
                      </Button>
                    </Stack>
                    {this.state.name && (
                      <Card align="center">
                        <CardHeader
                          title={"당신을 닮은 포켓몬은? " + this.state.name}
                          align="center"
                          style={tempStyle}
                        >
                          {" "}
                        </CardHeader>
                        <img
                          src={this.state.dis_url}
                          alt=""
                          width="224"
                          height="224"
                          align="center"
                        />
                      </Card>
                    )}
                  </Card>
                )}
              </Grid>
            )}
            {this.state.toggle_state === "camera" && (
              <Grid item xs={12}>
                <Card>
                  <CardContent align="center">
                    <Typography variant="h6" color="textPrimary" component="h6">
                      CAMERA PREVIEW
                    </Typography>
                    <Stack
                      sx={{ mt: 1, mb: 1 }}
                      direction="row"
                      spacing={2}
                      justifyContent="center"
                    >
                      <Button
                        variant="contained"
                        align="center"
                        color="primary"
                        onClick={() => this.turnCamera()}
                      >
                        Camera On/Off
                      </Button>
                    </Stack>
                  </CardContent>
                  {this.state.loading && (
                    <WebCamCapture
                      saveCapturedImage={(data) => this.saveCapturedImage(data)}
                    />
                  )}
                  {this.state.loading && this.state.image_data && (
                    <CardContent>
                      <CardHeader
                        title={`Captured Image`}
                        align="center"
                      ></CardHeader>
                      <img
                        src={this.state.image_data}
                        alt=""
                        align="center"
                        width="100%"
                        height="100%"
                      />
                      <Box>
                        <UploadImage image_data={this.state.image_data} />
                      </Box>
                    </CardContent>
                  )}
                </Card>
              </Grid>
            )}
          </Grid>
        </Container>
      </ThemeProvider>
    );
  }
}
