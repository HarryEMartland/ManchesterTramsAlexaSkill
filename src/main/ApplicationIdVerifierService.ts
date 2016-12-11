export namespace ApplicationIdVerifierService{

    export function verify(context:Request){
        let isCorrectApplicationId = context.session.application.applicationId === process.env.alexa_skill_application_id;
        if(!isCorrectApplicationId){
            throw new Error("Invalid Application ID");
        }
    }

}