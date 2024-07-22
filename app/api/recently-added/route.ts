import { NextResponse, NextRequest } from "next/server";
import { db } from '../../config/db';

export async function GET() {
    try {
        const results = await new Promise((resolve, reject) => {
            db.query("SELECT * FROM exams ORDER BY uploaded_date DESC LIMIT 4", (err: any, results: []) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });

        console.log(results);
        return NextResponse.json(results);

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
