// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { PassportStrategy } from '@nestjs/passport';
// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// @Injectable()
// export class JwtStrategy extends
//     PassportStrategy(Strategy,"product-jwt") {
//     constructor(config: ConfigService) {
//         console.log("validate token processing:::" +  config.get("SECRET_KEY"));
//         super({
//             jwtFromRequest:
//                 ExtractJwt.fromAuthHeaderAsBearerToken,
//             ignoreExpiration: false,
//             secretOrKey: config.get("SECRET_KEY"),
//         });
//     }
//     async validate(payload: any) {
//         console.log("validate token return payload:::" + payload);
//         return payload;
//     }
// }