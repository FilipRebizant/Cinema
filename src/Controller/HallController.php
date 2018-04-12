<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class HallController extends Controller
{
    /**
     * @Route("/halls", name="halls")
     */
    public function index()
    {
        return $this->render('halls/index.html.twig', [
            'controller_name' => 'HallController',
        ]);
    }
}
