const mimeMap = {
  '.001': 'application/x-001',
  '.323': 'text/h323',
  '.907': 'drawing/907',
  '.acp': 'audio/x-mei-aac',
  '.aif': 'audio/aiff',
  '.aiff': 'audio/aiff',
  '.asa': 'text/asa',
  '.asp': 'text/asp',
  '.au': 'audio/basic',
  '.awf': 'application/vnd.adobe.workflow',
  '.bmp': 'image/bmp',
  '.c4t': 'application/x-c4t',
  '.cal': 'application/x-cals',
  '.cdf': 'application/x-netcdf',
  '.cel': 'application/x-cel',
  '.cg4': 'application/x-g4',
  '.cit': 'application/x-cit',
  '.cml': 'text/xml',
  '.cmx': 'application/x-cmx',
  '.crl': 'application/pkix-crl',
  '.csi': 'application/x-csi',
  '.cut': 'application/x-cut',
  '.dbm': 'application/x-dbm',
  '.dcd': 'text/xml',
  '.der': 'application/x-x509-ca-cert',
  '.dib': 'application/x-dib',
  '.doc': 'application/msword',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.drw': 'application/x-drw',
  '.dwg': 'application/x-dwg',
  '.dxf': 'application/x-dxf',
  '.emf': 'application/x-emf',
  '.ent': 'text/xml',
  '.eps': 'application/postscript',
  '.etd': 'application/x-ebx',
  '.fax': 'image/fax',
  '.fif': 'application/fractals',
  '.frm': 'application/x-frm',
  '.gbr': 'application/x-gbr',
  '.gif': 'image/gif',
  '.gp4': 'application/x-gp4',
  '.hmr': 'application/x-hmr',
  '.hpl': 'application/x-hpl',
  '.hrf': 'application/x-hrf',
  '.htc': 'text/x-component',
  '.html': 'text/html',
  '.htm': 'text/html',
  '.htx': 'text/html',
  '.ico': 'image/x-icon',
  '.iff': 'application/x-iff',
  '.igs': 'application/x-igs',
  '.img': 'application/x-img',
  '.isp': 'application/x-internet-signup',
  '.java': 'text/x-java-source',
  '.jpe': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'application/javascript',
  '.jsp': 'text/html',
  '.lar': 'application/x-laplayer-reg',
  '.lavs': 'audio/x-liquid-secure',
  '.lmsff': 'audio/x-la-lms',
  '.ltr': 'application/x-ltr',
  '.m2v': 'video/x-mpeg',
  '.m4e': 'video/mpeg4',
  '.man': 'application/x-troff-man',
  '.mdb': 'application/msaccess',
  '.mfp': 'application/x-shockwave-flash',
  '.mhtml': 'message/rfc822',
  '.mid': 'audio/mid',
  '.mil': 'application/x-mil',
  '.mnd': 'audio/x-musicnet-download',
  '.mocha': 'application/javascript',
  '.mp1': 'audio/mp1',
  '.mp2': 'audio/mp2',
  '.mp3': 'audio/mp3',
  '.mp4': 'video/mp4',
  '.mpa': 'video/x-mpg',
  '.mpd': 'application/vnd.ms-project',
  '.mpe': 'video/x-mpeg',
  '.mpeg': 'video/mpeg',
  '.mpg': 'video/mpg',
  '.mpp': 'application/vnd.ms-project',
  '.mps': 'video/x-mpeg',
  '.mpv': 'video/mpg',
  '.mpw': 'application/vnd.ms-project',
  '.mtx': 'text/xml',
  '.net': 'image/pnetvue',
  '.nws': 'message/rfc822',
  '.odc': 'text/x-ms-odc',
  '.out': 'application/x-out',
  '.p10': 'application/pkcs10',
  '.p12': 'application/x-pkcs12',
  '.p7b': 'application/x-pkcs7-certificates',
  '.p7c': 'application/pkcs7-mime',
  '.p7m': 'application/pkcs7-mime',
  '.p7r': 'application/x-pkcs7-certreqresp',
  '.p7s': 'application/pkcs7-signature',
  '.pc5': 'application/x-pc5',
  '.pcl': 'application/x-pcl',
  '.pdf': 'application/pdf',
  '.pdx': 'application/vnd.adobe.pdx',
  '.pfx': 'application/x-pkcs12',
  '.pgl': 'application/x-pgl',
  '.pic': 'application/x-pic',
  '.pko': 'application/vnd.ms-pki.pko',
  '.pl': 'application/x-perl',
  '.plg': 'text/html',
  '.pls': 'audio/scpls',
  '.plt': 'application/x-plt',
  '.png': 'image/png',
  '.pot': 'application/vnd.ms-powerpoint',
  '.ppa': 'application/vnd.ms-powerpoint',
  '.pps': 'application/vnd.ms-powerpoint',
  '.ppt': 'application/vnd.ms-powerpoint',
  '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  '.prf': 'application/pics-rules',
  '.prn': 'application/x-prn',
  '.prt': 'application/x-prt',
  '.ps': 'application/postscript',
  '.ptn': 'application/x-ptn',
  '.pwz': 'application/vnd.ms-powerpoint',
  '.ra': 'audio/vnd.rn-realaudio',
  '.ram': 'audio/x-pn-realaudio',
  '.ras': 'application/x-ras',
  '.rat': 'application/rat-file',
  '.rdf': 'text/xml',
  '.rec': 'application/vnd.rn-recording',
  '.red': 'application/x-red',
  '.rjs': 'application/vnd.rn-realsystem-rjs',
  '.rlc': 'application/x-rlc',
  '.rm': 'application/vnd.rn-realmedia',
  '.rmi': 'audio/mid',
  '.rmm': 'audio/x-pn-realaudio',
  '.rmp': 'application/vnd.rn-rn_music_package',
  '.rms': 'application/vnd.rn-realmedia-secure',
  '.rmvb': 'application/vnd.rn-realmedia-vbr',
  '.rmx': 'application/vnd.rn-realsystem-rmx',
  '.rnx': 'application/vnd.rn-realplayer',
  '.rp': 'image/vnd.rn-realpix',
  '.rpm': 'audio/x-pn-realaudio-plugin',
  '.rsml': 'application/vnd.rn-rsml',
  '.rt': 'text/vnd.rn-realtext',
  '.rtf': 'application/rtf',
  '.rv': 'video/vnd.rn-realvideo',
  '.sat': 'application/x-sat',
  '.sdp': 'application/sdp',
  '.sdw': 'application/x-sdw',
  '.sit': 'application/x-stuffit',
  '.slb': 'application/x-slb',
  '.slk': 'drawing/x-slk',
  '.smi': 'application/smil',
  '.smil': 'application/smil',
  '.smk': 'application/x-smk',
  '.snd': 'audio/basic',
  '.sol': 'text/plain',
  '.sor': 'text/plain',
  '.spc': 'application/x-pkcs7-certificates',
  '.spl': 'application/futuresplash',
  '.spp': 'text/xml',
  '.ssm': 'application/streamingmedia',
  '.sst': 'application/vnd.ms-pki.certstore',
  '.stl': 'application/vnd.ms-pki.stl',
  '.stm': 'text/html',
  '.sty': 'application/x-sty',
  '.svg': 'image/svg+xml',
  '.swf': 'application/x-shockwave-flash',
  '.tg4': 'application/x-tg4',
  '.tga': 'application/x-tga',
  '.tif': 'image/tiff',
  '.tiff': 'image/tiff',
  '.tld': 'text/xml',
  '.top': 'drawing/x-top',
  '.torrent': 'application/x-bittorrent',
  '.tsd': 'text/xml',
  '.txt': 'text/plain',
  '.uin': 'application/x-icq',
  '.uls': 'text/iuls',
  '.vcf': 'text/x-vcard',
  '.vda': 'application/x-vda',
  '.vdx': 'application/vnd.visio',
  '.vml': 'text/xml',
  '.vpg': 'application/x-vpeg005',
  '.vsd': 'application/vnd.visio',
  '.vss': 'application/vnd.visio',
  '.vst': 'application/vnd.visio',
  '.vsw': 'application/vnd.visio',
  '.vsx': 'application/vnd.visio',
  '.vtx': 'application/vnd.visio',
  '.vxml': 'text/xml',
  '.wav': 'audio/wav',
  '.wax': 'audio/x-ms-wax',
  '.wb1': 'application/x-wb1',
  '.wb2': 'application/x-wb2',
  '.wb3': 'application/x-wb3',
  '.wbmp': 'image/vnd.wap.wbmp',
  '.wiz': 'application/msword',
  '.wk3': 'application/x-wk3',
  '.wk4': 'application/x-wk4',
  '.wkq': 'application/x-wkq',
  '.wks': 'application/x-wks',
  '.wm': 'video/x-ms-wm',
  '.wma': 'audio/x-ms-wma',
  '.wmd': 'application/x-ms-wmd',
  '.wmf': 'application/x-wmf',
  '.wml': 'text/vnd.wap.wml',
  '.wmv': 'video/x-ms-wmv',
  '.wmx': 'video/x-ms-wmx',
  '.wmz': 'application/x-ms-wmz',
  '.wp6': 'application/x-wp6',
  '.wpd': 'application/x-wpd',
  '.wpg': 'application/x-wpg',
  '.wpl': 'application/vnd.ms-wpl',
  '.wq1': 'application/x-wq1',
  '.wr1': 'application/x-wr1',
  '.wrk': 'application/x-wrk',
  '.wri': 'application/x-wri',
  '.ws': 'application/x-ws',
  '.ws2': 'application/x-ws',
  '.wsc': 'text/scriptlet',
  '.wsdl': 'text/xml',
  '.wvx': 'video/x-ms-wvx',
  '.xdp': 'application/vnd.adobe.xdp',
  '.xdr': 'text/xml',
  '.xfd': 'application/vnd.adobe.xfd',
  '.xfdf': 'application/vnd.adobe.xfdf',
  '.xhtml': 'text/html',
  '.xls': 'application/vnd.ms-excel',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  '.xlw': 'application/x-xlw',
  '.xml': 'text/xml',
  '.xpl': 'audio/scpls',
  '.xq': 'text/xml',
  '.xquery': 'text/xml',
  '.xsl': 'text/xml',
  '.xwd': 'application/x-xwd',
  '.x_b': 'application/x-x_b',
  '.x_t': 'application/x-x_t',
  '.sis': 'application/vnd.symbian.install',
  '.sisx': 'application/vnd.symbian.install',
  '.apk': 'application/vnd.android.package-archive',
  '.ipa': 'application/vnd.iphone',
  '.xap': 'application/x-silverlight-app',
  '.zip': 'application/zip',
};
export function FormData() {
  const fileManager = wx.getFileSystemManager();
  const data = {};
  const files = [];

  this.append = (name, value) => {
    if (data[name]) {
      if (!Array.isArray(data[name])) {
        data[name] = [data[name]];
      }
      data[name].push(value);
    }
    else {
      data[name] = value;
    }
    return true;
  };

  this.appendFile = (name, path, fileName) => {
    const buffer = fileManager.readFileSync(path);
    if (!Object.prototype.toString.call(buffer).includes('ArrayBuffer')) {
      return false;
    }

    if (!fileName) {
      fileName = getFileNameFromPath(path);
    }

    files.push({
      name,
      buffer,
      fileName,
    });
    return true;
  };

  this.getData = () => convert(data, files);
}

function getFileNameFromPath(path) {
  const idx = path.lastIndexOf('/');
  return path.substr(idx + 1);
}

// 独立的工具函数替代 String.prototype.toUtf8Bytes
function stringToUtf8Bytes(str) {
  const bytes = [];
  for (let i = 0; i < str.length; i++) {
    bytes.push(...utf8CodeAt(str, i));
    if (str.codePointAt(i) > 0xFFFF) {
      i++;
    }
  }
  return bytes;
}

// 独立的工具函数替代 String.prototype.utf8CodeAt
function utf8CodeAt(str, i) {
  const out = [];
  let p = 0;
  let c = str.charCodeAt(i);
  if (c < 128) {
    out[p++] = c;
  }
  else if (c < 2048) {
    out[p++] = (c >> 6) | 192;
    out[p++] = (c & 63) | 128;
  }
  else if (
    ((c & 0xFC00) === 0xD800) && (i + 1) < str.length
    && ((str.charCodeAt(i + 1) & 0xFC00) === 0xDC00)) {
    // Surrogate Pair
    c = 0x10000 + ((c & 0x03FF) << 10) + (str.charCodeAt(++i) & 0x03FF);
    out[p++] = (c >> 18) | 240;
    out[p++] = ((c >> 12) & 63) | 128;
    out[p++] = ((c >> 6) & 63) | 128;
    out[p++] = (c & 63) | 128;
  }
  else {
    out[p++] = (c >> 12) | 224;
    out[p++] = ((c >> 6) & 63) | 128;
    out[p++] = (c & 63) | 128;
  }
  return out;
}

function convert(data, files) {
  const boundaryKey = `wxmpFormBoundary${randString()}`; // 数据分割符，一般是随机的字符串
  const boundary = `--${boundaryKey}`;
  const endBoundary = `${boundary}--`;

  let postArray = [];
  // 拼接参数
  if (data && Object.prototype.toString.call(data) === '[object Object]') {
    for (const key in data) {
      postArray = postArray.concat(formDataArray(boundary, key, data[key]));
    }
  }
  // 拼接文件
  if (files && Object.prototype.toString.call(files) === '[object Array]') {
    for (const i in files) {
      const file = files[i];
      postArray = postArray.concat(formDataArray(boundary, file.name, file.buffer, file.fileName));
    }
  }
  // 结尾
  const endBoundaryArray = [];
  endBoundaryArray.push(...stringToUtf8Bytes(endBoundary));
  postArray = postArray.concat(endBoundaryArray);
  return {
    contentType: `multipart/form-data; boundary=${boundaryKey}`,
    buffer: new Uint8Array(postArray).buffer,
  };
}

function randString() {
  let result = '';
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let i = 17; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

function formDataArray(boundary, name, value, fileName) {
  let dataArray = [];

  // 处理数组类型的值
  if (Array.isArray(value)) {
    value.forEach((item) => {
      dataArray = dataArray.concat(createFormDataItem(boundary, name, item, fileName));
    });
    return dataArray;
  }

  return createFormDataItem(boundary, name, value, fileName);
}

function createFormDataItem(boundary, name, value, fileName) {
  let dataString = '';
  const isFile = !!fileName;

  dataString += `${boundary}\r\n`;
  dataString += `Content-Disposition: form-data; name="${name}"`;
  if (isFile) {
    dataString += `; filename="${fileName}"` + `\r\n`;
    dataString += `Content-Type: ${getFileMime(fileName)}\r\n\r\n`;
  }
  else {
    dataString += '\r\n\r\n';
    dataString += value;
  }

  let dataArray = [];
  dataArray.push(...stringToUtf8Bytes(dataString));

  if (isFile) {
    const fileArray = new Uint8Array(value);
    dataArray = dataArray.concat(Array.prototype.slice.call(fileArray));
  }
  dataArray.push(...stringToUtf8Bytes('\r\n'));

  return dataArray;
}

function getFileMime(fileName) {
  const idx = fileName.lastIndexOf('.');
  const mime = mimeMap[fileName.substr(idx)];
  return mime || 'application/octet-stream';
}
