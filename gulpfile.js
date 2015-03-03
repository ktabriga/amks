var fs = require('fs');
var path = require('path');
var merge = require('merge-stream');
var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');


function getFolders(dir) {
    return fs.readdirSync(dir)
      .filter(function(file) {
        return fs.statSync(path.join(dir, file)).isDirectory();
      });
}

/*
  Task percorre todas as pastas dentro de /cliente/modulos concatenando e minificando os arquivos .js
  Autor: André Silva

  Baseado em: https://github.com/gulpjs/gulp/blob/master/docs/recipes/running-task-steps-per-folder.md
*/
gulp.task('modulos', function() {
   var modulosPath = 'cliente/modulos';
   var modulosDestPath = 'cliente/build';

   var folders = getFolders(modulosPath);

   console.log('[gulp]: Iniciando a compactação dos módulos..');

   var tasks = folders.map(function(folder) {

      console.log('[gulp]: Compactando o módulo ' + folder + '..');
      
      return gulp.src(path.join(modulosPath, folder, '/**/*.js'))
        // Concatenar em "modulo".js
        .pipe(concat(folder + '.js'))
        // Escrever arquivo na pasta destino ("modulo".js)
        .pipe(gulp.dest(modulosDestPath))
        // Minificar
        .pipe(uglify())
        // Renomear para "modulo".min.js
        .pipe(rename(folder + '.min.js'))
        // Escrever arquivo na pasta destino ("modulo".min.js)
        .pipe(gulp.dest(modulosDestPath));
   });

   return merge(tasks);
});

gulp.task('default', function() {
  //Executar a task modulos
  gulp.start('modulos');
});