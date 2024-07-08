import inquirer from "inquirer";

class student {
    static counter = 10000;
    id: Number;
    name: string;
    courses: string[];
    balance: number;

    constructor(name: string) {
        this.id = student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 100;
    }

    enroll_course(course: string) {
        this.courses.push(course);
    }

    view_balance() {
        console.log(`balance for ${this.name}: ${this.balance}`);
    }

    pay_fees(amount: number) {
        this.balance -= amount;
        console.log(`$ ${amount} fees paid successfully for ${this.name}`);
    }

    show_status() {
        console.log(`ID = ${this.id}`);
        console.log(`NAME = ${this.name}`);
        console.log(`COURSES = ${this.courses}`);
        console.log(`BALANCE = ${this.balance}`);
    }
}

class student_manager {
    students: student[];

    constructor() {
        this.students = [];
    }

    add_student(name: string) {
        let newStudent = new student(name);
        this.students.push(newStudent);
        console.log(`student: ${name} added successfully. student id ${newStudent.id}`);
    }

    get_student_by_id(id: Number): student | undefined {
        return this.students.find(student => student.id === id);
    }

    async prompt_add_student() {
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Enter the name of the student:'
            }
        ]);
        this.add_student(answers.name);
    }

    async prompt_enroll_course() {
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'id',
                message: 'Enter the student ID:'
            },
            {
                type: 'input',
                name: 'course',
                message: 'Enter the course name:'
            }
        ]);

        let student = this.get_student_by_id(Number(answers.id));
        if (student) {
            student.enroll_course(answers.course);
            console.log(`Course ${answers.course} enrolled successfully for student ${student.name}`);
        } else {
            console.log('Student not found');
        }
    }

    async prompt_pay_fees() {
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'id',
                message: 'Enter the student ID:'
            },
            {
                type: 'input',
                name: 'amount',
                message: 'Enter the amount to pay:'
            }
        ]);

        let student = this.get_student_by_id(Number(answers.id));
        if (student) {
            student.pay_fees(Number(answers.amount));
        } else {
            console.log('Student not found');
        }
    }

    async prompt_view_balance() {
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'id',
                message: 'Enter the student ID:'
            }
        ]);

        let student = this.get_student_by_id(Number(answers.id));
        if (student) {
            student.view_balance();
        } else {
            console.log('Student not found');
        }
    }

    async prompt_show_status() {
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'id',
                message: 'Enter the student ID:'
            }
        ]);

        let student = this.get_student_by_id(Number(answers.id));
        if (student) {
            student.show_status();
        } else {
            console.log('Student not found');
        }
    }

    async prompt_main_menu() {
        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'Select an action:',
                choices: ['Add Student', 'Enroll Course', 'Pay Fees', 'View Balance', 'Show Status', 'Exit']
            }
        ]);

        switch (answers.action) {
            case 'Add Student':
                await this.prompt_add_student();
                break;
            case 'Enroll Course':
                await this.prompt_enroll_course();
                break;
            case 'Pay Fees':
                await this.prompt_pay_fees();
                break;
            case 'View Balance':
                await this.prompt_view_balance();
                break;
            case 'Show Status':
                await this.prompt_show_status();
                break;
            case 'Exit':
                console.log('Exiting...');
                return;
        }

        await this.prompt_main_menu(); // Loop back to the main menu
    }
}

async function main() {
    const manager = new student_manager();
    await manager.prompt_main_menu();
}

main().catch(console.error);
