import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { BookService } from './book.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BookDto } from './dto/book.dto';
import { Request } from '@nestjs/common';
import { BookFilterDto } from './dto/bookFilter.dto';
import { UpdateBookStatusDto } from './dto/update-status.dto';
import { Role } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: BookDto, @Request() req) {
    return this.bookService.create(dto, req.user.userId)
  }

  @Get('/pending')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role('admin')
  findAllPending() {
    return this.bookService.findAllPending();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.bookService.findOne(id);
  }

  @Get()
  findAll(@Query() query: BookFilterDto) {
    return this.bookService.findAll(query);
  }


  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.bookService.delete(id, req.user.userId)
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Body() dto: UpdateBookDto, @Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.bookService.update(id, req.user.userId, dto);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role('admin')
  changeStatus(@Body() dto: UpdateBookStatusDto, @Param('id', ParseIntPipe) id: number) {
    return this.bookService.changeStatus(id, dto);
  }

}
