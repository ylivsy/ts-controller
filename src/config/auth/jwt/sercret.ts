export const JWT_SECRET = 'superup_secret';

if (!JWT_SECRET) {
    console.log('No JWT secret string. set JWT_SECRET environment variable');
    process.exit(1);
}
