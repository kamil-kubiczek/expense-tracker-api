import { TRPCError } from '@trpc/server';
import { publicLoggedProcedure } from '~/trpc/middlewares/publicLogged';
import { ErrorMessages } from '../errors/messages';
import { composeUserForEventContext, verifyAndDecodeAccessToken } from '../services/authService';
import { checkIfEmployeeExists } from '../services/employeesService';

export const authentificatedProcedure = publicLoggedProcedure.use(async ({ next, ctx }) => {
   const accessToken = ctx.cookieJar.get('Authentification');
   const decodedAccessToken = await verifyAndDecodeAccessToken(accessToken);
   const employeeExists = await checkIfEmployeeExists(decodedAccessToken.id);

   if (!employeeExists)
      throw new TRPCError({
         code: 'NOT_FOUND',
         message: ErrorMessages.EmployeeNotFound
      });
   return next({
      ctx: {
         currentUser: await composeUserForEventContext(decodedAccessToken.id)
      }
   });
});
