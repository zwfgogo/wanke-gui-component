import wanke from '../wanke';

function enable(code: any, codes: any[]) {
  if ({}.toString.call(codes).indexOf('Array') > -1) {
    if (codes.indexOf(code) > -1) {
      return true;
    }
    return false;
  }
  return false;
}

interface AuthorityProps {
  code: any;
  codes: any[];
  children: any;
}

function Authority({ code, codes, children }: AuthorityProps) {
  let newCodes;
  if (typeof codes === 'undefined') {
    newCodes = [...wanke.options.codes];
  } else {
    newCodes = codes;
  }
  if (enable(code, newCodes)) {
    return children;
  }
  return null;
}

Authority.get = function(code: any, codes: any[], children: any) {
  if (enable(code, codes)) {
    return children;
  }
  if ({}.toString.call(children).indexOf('Array') > -1) {
    return [];
  }
  if ({}.toString.call(children).indexOf('Object') > -1) {
    return {};
  }
  return null;
};

export default Authority;
