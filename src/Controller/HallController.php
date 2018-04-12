<?php

namespace App\Controller;

use App\Entity\Hall;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class HallController extends Controller
{
    /**
     * @Route("/halls", name="halls")
     */
    public function index()
    {
        $hallList = $this->getDoctrine()->getRepository(Hall::class)->findAll();

        return $this->render('halls/index.html.twig', [
            'hallList' => $hallList,
        ]);
    }

    /**
     * @Route("/hall/{id}", name="showHall")
     * @param $id
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function show($id)
    {
        $hall = $this->getDoctrine()->getRepository(Hall::class)->find($id);

        return $this->render('halls/hall.html.twig', ['hall' => $hall]);
    }
}
