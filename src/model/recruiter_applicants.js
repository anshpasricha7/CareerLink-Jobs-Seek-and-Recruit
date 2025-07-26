export default class applicant{
constructor(image , name , email  , experience ,id){
this.image=image;
this.name=name;
this.email=email;
this.experience=experience;
this.id=id;
}

static addApplicant(image , name , email  , experience ,id){
    const newEntry= new applicant(image , name , email  , experience ,id);
    applicantList.push(newEntry);
}
static getData(){
    return applicantList;
}

}
let applicantList=[];