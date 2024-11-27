import { Controller, Post, Get, Put, Delete, UseGuards, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserMSG } from 'src/common/constans';

@Controller()
export class UserController {
  
     constructor(private readonly userService: UserService){}
    
    @MessagePattern(UserMSG.CREATE) 
    create(@Payload() userDTO: UserDTO) {
        console.log('Datos recibidos:', userDTO);
        return this.userService.create(userDTO);
    }
    
    @MessagePattern(UserMSG.FIND_ALL)
    findAll() {
        return this.userService.findAll();
    }

    @MessagePattern(UserMSG.UPDATE)
    update(@Payload() payload:any) {
        return this.userService.update(payload.id, payload.userDTO);
    }

    @MessagePattern(UserMSG.DELETE)
    delete(@Payload() id:string) {
        return this.userService.delete(id);
    }
    
    @MessagePattern(UserMSG.VALID_USER)
    async validateUser(@Payload() payload) {
        const user = await this.userService.findByUsername(payload.username);

        const isValidPassword = await this.userService.checkPassword(
            payload.password,
            user.password,
        );

        if (user && isValidPassword) return user;

        return null;
    }
}


