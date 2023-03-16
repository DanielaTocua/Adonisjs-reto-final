import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
import jwt from 'jsonwebtoken'
import Env from '@ioc:Adonis/Core/Env'
import bcryptjs from 'bcryptjs'
import Database from '@ioc:Adonis/Lucid/Database';
import Role from 'App/Models/Role';
export default class UsersController {
    public async registerStudent({request}: HttpContextContract){
      try {

        const {firstName, secondName, surname, secondSurName, typeDocument, documentNumber, email, password, phone} = request.all();
        const salt = bcryptjs.genSaltSync();
        const user = new User();
        user.first_name = firstName;
        user.second_name = secondName;
        user.surname = surname;
        user.second_sur_name = secondSurName
        user.type_document = typeDocument
        user.document_number = documentNumber
        user.email = email
        user.password = bcryptjs.hashSync( password, salt )
        user.role_id = 1
        user.phone = phone
          
        await user.save();
        return { "state": true, "message": "Estudiante creado correctamente"}
      } catch {
        return { "state": false, "message": "Fallo en la creación del estudiante"}
      }
    }

      public async listStudents({request}: HttpContextContract){
        try{

          const {perPage,page,filter} = request.all()
          const list = await Database.from('users').select({
            firstName: 'first_name',
            secondName: 'second_name',
            surname:'surname',
            secondSurName:'second_sur_name',
            typeDocument:'type_document',
            documentNumber:'document_number',
            email:'email',
            phone:'phone'
          }).where((builder)=>{
            if(filter.name)
              builder.where('first_name',filter.name).orWhere('second_name',filter.name)

            if(filter.surname)
              builder.where('surname',filter.surname).orWhere('second_sur_name',filter.surname)
            
          }).limit(perPage).offset(perPage*(page - 1))
          return { "state": true, "message": "Listado de estudiantes","users":list}
        } catch {
          return { "state": false, "message": "Fallo en el listado de estudiantes"}
        }
      }
      

      public async login({request, response}: HttpContextContract){
      const {email,password} = request.body()
        //consultar si existe usuario con ese correo
        const user = await User.findBy('email', email)
        if(!user){
          return response.status(400).json({
            "state": false,
            "message": "contraseña o email inválido"})
        }
  
        const validPassword = bcryptjs.compareSync( password, user.password );
        if ( !validPassword ) {
          return response.status(400).json({
            "state": false,
            "message": "contraseña o email inválido"})
        }
        //Validar si la contraseña ingresada es igual a la del usaurio
        const payload ={
          'name': user.first_name,
          'surname': user.surname,
          'id': user.id,
          'document_number': user.document_number
        }
        const token:string = this.generateToken(payload);
  
        response.status(200).json({ "state": true, "id":user.id,"name": UsersController.getFullName(user),"role": await UsersController.getRole(user),"message": "Ingreso exitoso"})
        response.header('Authorization','Bearer ' + token)
      }

      public async updateUser({request}: HttpContextContract){
        try {

          const id = request.param('id');
          const user = await User.findOrFail(id)
          const {firstName,secondName,surname,secondSurName,typeDocument,documentNumber,email,phone} = request.all();
          user.first_name = firstName;
          user.second_name = secondName;
          user.surname = surname;
          user.second_sur_name = secondSurName
          user.type_document = typeDocument
          user.document_number = documentNumber
          user.email = email
          user.phone = phone
  
          await user.save()
          return {"state": true,
            "message": "Se actualizó correctamente"}      
        } catch {
          return {"state": false,
            "message": "Error al actualizar"} 

        }
     }

     public async getUser({request}: HttpContextContract){
      try {

        const id = request.param('id');
        const user = await User.findOrFail(id)
        const userDetails = {
            firstName: user.first_name,
            secondName: user.second_name,
            surname:user.surname,
            secondSurName:user.second_sur_name,
            typeDocument:user.type_document,
            documentNumber:user.document_number,
            email:user.email,
            phone:user.phone
        }
        return userDetails      
      } catch {
        return {"state": false,
          "message": "Error al consultar el detalle del usuario"} 

      }
   }


      public static getFullName(user:User){
        return user.first_name.concat(" ",user.second_name," ", user.surname," ", user.second_sur_name)
      }    
      public static async getRole(user:User){
        return (await Role.findOrFail(user.role_id)).name
      }    

      public generateToken(payload: any):string{
        const opts = {
          expiresIn: "10 mins"
        }
        return jwt.sign(payload, Env.get('JWT_SECRET_KEY'), opts)    
      }

      public static verifyToken(authorizationHeader:string){
        const  token = authorizationHeader.split(' ')[1]
        jwt.verify(token, Env.get('JWT_SECRET_KEY'))
        return true
      }

}
