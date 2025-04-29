const jwt = require('jsonwebtoken');
const JWT_SECRET = 'secret_key';

const jwtAuthentication = (req, res, next)=>{
	// 토큰 꺼내기
    const token = req.headers.token;
	// 토큰 없으면 만료되었거나 로그인 안된 사람
    if(!token){
        return res.json({success : false, message : "로그인 후 이용해주세요."});
    }
	// 토큰 증명("secret_key" 는 앞에서 한 JWT_KEY로 모듈화 해서 사용 권장)
    jwt.verify(token, JWT_SECRET, (err, user)=>{
        if(err){
            return res.json({success : false, message : "토큰이 유효하지 않습니다."});
        }
		// 토큰이 유효할 경우 콜백함수 next 실행(원래 실행했어야 하는 api 코드)
        next();
    });  
}

module.exports = jwtAuthentication;