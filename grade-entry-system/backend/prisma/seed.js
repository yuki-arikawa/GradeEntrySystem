import {exec} from 'child_process';
import bcrypt from 'bcrypt';


// データの挿入
const insertData = async (id, password, role) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const command = `wrangler d1 execute DB --command "INSERT INTO user (id, passwordHash, role) VALUES (${id}, '${hashedPassword}', '${role}');"`;

  exec(command, (error, stdout, stderr) => {
    if(error){
      console.error(`エラー：${error.message}`);
      return;
    }
    if(stderr){
      console.error(`stderr:${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
};

const userData = [
  {id: 2249993, password: 'password3', role: 'student'},
];

userData.map((u) => insertData(u.id, u.password, u.role));