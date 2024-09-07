import { appValidationErrorMessages } from 'src/common/validation/validation.constants';
import { app, server } from '../../main';
import request from 'supertest';
import { Language } from 'src/app.type';
import { AppErrorMessage } from 'src/common/response/response.enum';

describe('/weather/current', () => {
  const path = '/weather/current';

  const languages: { lang: Language; name: string }[] = [
    { lang: 'en', name: 'English' },
    { lang: 'ar', name: 'Arabic' },
  ];

  afterAll((done) => {
    server.close(done);
  });

  languages.forEach(({ lang, name }) => {
    describe(`Tests for ${name}`, () => {
      it('should return weather data for valid lat/lon', async () => {
        const response = await request(app).get(path).query({ lat: '25', lon: '45' });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
          data: {
            temp: {
              current: 23,
              max: 24.2,
              min: 20.3,
            },
          },
        });
      });

      it('should return a 400 error for invalid lat/lon', async () => {
        const response = await request(app).get(path).query({ lat: '12d', lon: '21,4' }).set('lang', lang);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', AppErrorMessage.INVALID_REQUEST);
        expect(response.body.validationErrors).toHaveProperty(
          'lat',
          appValidationErrorMessages.MUST_BE_VALID_NUMBER[lang]
        );
        expect(response.body.validationErrors).toHaveProperty(
          'lon',
          appValidationErrorMessages.MUST_BE_VALID_NUMBER[lang]
        );
      });

      it('should return a 400 error for lat/lon out of range', async () => {
        const response = await request(app).get(path).query({ lat: '-100', lon: '200' }).set('lang', lang);

        expect(response.status).toBe(400);
        expect(response.body.validationErrors).toHaveProperty(
          'lat',
          appValidationErrorMessages.MUST_BE_BETWEEN(-90, 90)[lang]
        );
        expect(response.body.validationErrors).toHaveProperty(
          'lon',
          appValidationErrorMessages.MUST_BE_BETWEEN(-180, 180)[lang]
        );
      });
    });
  });
});
