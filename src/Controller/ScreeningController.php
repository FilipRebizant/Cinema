<?php

namespace App\Controller;

use App\Entity\Screening;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class ScreeningController extends Controller
{
    /**
     * @Route("/screening", name="screening")
     */
    public function index()
    {
        return $this->render('screening/index.html.twig', [
            'controller_name' => 'ScreeningController',
        ]);
    }


    /**
     * @Route("/screening/{id}", name="showScreening")
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function show($id)
    {
        $screening = $this->getDoctrine()->getRepository(Screening::class)->find($id);

        return $this->render('screening/show.html.twig', ['screening' => $screening]);
    }

}
