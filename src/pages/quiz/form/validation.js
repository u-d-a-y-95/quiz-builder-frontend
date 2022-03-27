
export const validation = (quiz) =>{
    const validity = {
        valid:1,
        status:{}
    }
    //
    if(!quiz?.title){
        validity.valid=0
        validity.status['title'] = "Title Can't be empty";
    }

    validity.status["questions"] = []
    // question
    quiz.questions.forEach((question)=>{
        const obj = {}
        // prob
        obj["prob"]={}
        if(!question?.prob?.text){
            validity.valid=0
            obj["prob"]["text"] = "Question Can't be empty"
        }else{
            obj["prob"]["text"] = ""
        }

        //options
        obj["options"] = []
        question?.options?.forEach((option)=>{
            const optionObj = {}
            if(!option?.text){
                validity.valid=0
                optionObj["text"] = "Option Can't be empty"
            }else{
                optionObj["text"] = ""
            }
            obj["options"].push(optionObj)
        })

        // check number of options
        if(question?.options?.length<2){
            validity.valid=0
            obj["numberOfOption"]="At least two option needed"
        }

        // check answers
        if(question?.answers?.length<1){
            validity.valid=0
            obj["numberOfChecked"]="At least One option checked"
        }

        // check point 

        if(question?.point<1){
            validity.valid=0
            obj["point"]="Point can't be 0 nor Negative"
        }else{
            obj["point"] =""
        }

        validity.status["questions"].push(obj)
    })

    return validity
}