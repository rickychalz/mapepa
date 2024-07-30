import { NextResponse, NextRequest } from "next/server";
import { db } from "../../config/db";

export async function GET() {
  try {
    const results = await new Promise((resolve, reject) => {
      db.query(
        ` SELECT classes.name AS class, subjects.name AS subject, education_level.name AS education_level, 
                exam_type.name AS exam_type, 
                institution.name AS institution, 
                description, 
                exam_page_link, 
                exam_file_path, 
                year, 
                uploaded_date 
            FROM exams 
            JOIN classes ON exams.class_id = classes.id 
            JOIN subjects ON exams.subject_id = subjects.id 
            JOIN education_level ON exams.education_level_id = education_level.id 
            JOIN institution ON exams.institution_id = institution.id 
            JOIN exam_type ON exams.exam_type_id = exam_type.id ORDER BY uploaded_date DESC LIMIT 4;`,
        (err: any, results: []) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
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
