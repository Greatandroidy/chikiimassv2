import { CollectionAfterChangeHook } from "payload";

const NewUser: CollectionAfterChangeHook = ({ doc, operation, req: { payload } }) => {
    if (operation === create) {
        const email = payload.sendEmail({
            to: `${doc.email}`,
            subject: 'Welcome To ChikiiMas!',
            text: 'Welcome To Chikimass Thank You for signinUp',
        });
        return email;
    }

}