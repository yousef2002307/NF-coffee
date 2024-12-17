<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class EmailController extends Controller
{
    public function create()
    {
        return view('email');
    }

    public function sendEmail(Request $request)
    {
        $request->validate([
         
          'subject' => 'required',
          'name' => 'required',
          'content' => 'required',
                 "pdf" => "nullable|mimes:pdf|max:10000",
                 "phone" => "nullable"
    ]);


if($request->hasFile('pdf')){
    $pdfPath = $request->file('pdf')->getRealPath();
    $data = [
        'subject' => $request->subject,
        'name' => $request->name,
        'email' => "main@coffeepointegy.com",
        'content' => $request->content,
        "hisemail" => $request->hisemail,
        "pdf" => $pdfPath,
        "phone" => $request->phone
    ];
      Mail::send('email-template', $data, function($message) use ($data, $pdfPath) {
          $message->to($data['email'])
                  ->subject($data['subject'])
                  ->attach($pdfPath, [
                      'as' => 'attachment.pdf',
                      'mime' => 'application/pdf',
                  ]);
      });
}else{
   
    $data = [
      'subject' => $request->subject,
      'name' => $request->name,
      'email' => "main@coffeepointegy.com",
      'content' => $request->content,
      "hisemail" => $request->hisemail,
     
      "phone" => $request->phone
  ];
    Mail::send('email-template', $data, function($message) use ($data) {
        $message->to($data['email'])
                ->subject($data['subject']);
           
    });
}
        return response()->json(['message' => 'Email sent!']);
    }
}
