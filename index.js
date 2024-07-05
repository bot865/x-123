
const {
   spawn
} = require('child_process')
const path = require('path')

function start() {
   let args = [path.join(__dirname, 'main.js'), ...process.argv.slice(2)]
   console.log([process.argv[0], ...args].join('\n'))
   let p = spawn(process.argv[0], args, {
         stdio: ['inherit', 'inherit', 'inherit', 'ipc']
      })
      .on('message', data => {
         if (data == 'reset') {
            console.log('إعادة تشغيل البوت...')
            p.kill()
            start()
            delete p
         }
      })
      .on('exit', code => {
         console.error('تم الخروج بالكود:', code)
         if (code == '.' || code == 1 || code == 0) start()
      })
}
start()
